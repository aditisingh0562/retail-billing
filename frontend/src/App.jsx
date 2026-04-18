import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem('username'))
  const [isRegistering, setIsRegistering] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'))
  const [userPhone, setUserPhone] = useState(localStorage.getItem('phone'))
  const [userAddress, setUserAddress] = useState(localStorage.getItem('address'))
  
  const [products, setProducts] = useState([])
  const [bills, setBills] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [view, setView] = useState('dashboard')
  const [selectedBill, setSelectedBill] = useState(null)

  useEffect(() => {
    if (token) {
      Promise.all([
        axios.get('/api/products'),
        axios.get('/api/bills')
      ]).then(([prodRes, billRes]) => {
        setProducts(prodRes.data)
        setBills(billRes.data)
        setLoading(false)
      }).catch(err => {
        console.error(err)
        setLoading(false)
      })
    }
  }, [token])

  const login = (e) => {
    e.preventDefault()
    axios.post('/api/auth/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('email', res.data.email || '')
        localStorage.setItem('phone', res.data.phone || '')
        localStorage.setItem('address', res.data.address || '')
        setToken(res.data.token)
        setLoggedUser(res.data.username)
        setUserEmail(res.data.email)
        setUserPhone(res.data.phone)
        setUserAddress(res.data.address)
        setUsername('')
        setPassword('')
      })
      .catch(err => alert('Login failed: ' + (err.response?.data?.error || err.message)))
  }

    const register = (e) => {
    e.preventDefault()
    axios.post('/api/auth/register', { username, password, email, phone, address })
      .then(res => {
        alert('Registration successful! Please login.')
        setIsRegistering(false)
        setPassword('')
        setEmail('')
        setPhone('')
        setAddress('')
      })
      .catch(err => alert('Registration failed: ' + (err.response?.data?.error || err.message)))
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('phone')
    localStorage.removeItem('address')
    setToken(null)
    setLoggedUser(null)
    setUserEmail(null)
    setUserPhone(null)
    setUserAddress(null)
  }

  const addToCart = (product) => {
    const existing = cart.find(item => item.product.id === product.id)
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { product, quantity: 1, price: product.price }])
    }
  }

  const createBill = () => {
    if (cart.length === 0) return alert('Cart is empty')
    const bill = { items: cart, totalAmount: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0) }
    axios.post('/api/bills', bill)
      .then(res => {
        setMessage(`Success! Invoice ${res.data.invoiceNumber} created.`)
        setCart([])
        return Promise.all([axios.get('/api/products'), axios.get('/api/bills')])
      })
      .then(([prodRes, billRes]) => {
        setProducts(prodRes.data)
        setBills(billRes.data)
      })
      .catch(err => alert('Failed to create bill'))
  }

  if (!token) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a' }}>
        <form onSubmit={isRegistering ? register : login} style={{ background: '#1e293b', padding: '2rem', borderRadius: '1rem', width: '320px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
          <h2 style={{ textAlign: 'center', color: '#38bdf8', marginBottom: '1.5rem' }}>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', border: 'none', background: '#334155', color: 'white' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', border: 'none', background: '#334155', color: 'white' }} />
          
          {isRegistering && (
            <>
              <input type="email" placeholder="Email ID" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', border: 'none', background: '#334155', color: 'white' }} />
              <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', border: 'none', background: '#334155', color: 'white' }} />
              <textarea placeholder="Full Address" value={address} onChange={e => setAddress(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '0.5rem', border: 'none', background: '#334155', color: 'white', minHeight: '80px' }} />
            </>
          )}

          <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#38bdf8', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold', color: '#0f172a' }}>
            {isRegistering ? 'Register' : 'Sign In'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"} <br/>
            <span onClick={() => setIsRegistering(!isRegistering)} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }}>
              {isRegistering ? 'Login here' : 'Create one now'}
            </span>
          </p>
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center', background: '#1e293b', padding: '1rem 2rem', borderRadius: '1rem' }}>
        <h1 style={{ background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.5rem' }}>Retail Billing</h1>
        
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ background: '#334155', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Hi, {loggedUser} ▾
          </button>
          
          {showDropdown && (
            <div style={{ position: 'absolute', right: 0, top: '110%', background: '#1e293b', padding: '0.5rem', borderRadius: '0.5rem', minWidth: '280px', border: '1px solid #334155', zIndex: 100, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}>
              <div style={{ padding: '0.75rem', borderBottom: '1px solid #334155' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Account Detail</div>
                <div style={{ fontWeight: 'bold' }}>{loggedUser}</div>
              </div>
              
              <div style={{ padding: '0.75rem', borderBottom: '1px solid #334155' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Recent Invoices</div>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {bills.length === 0 ? <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No invoices yet</div> : 
                   bills.slice().reverse().slice(0, 5).map(b => (
                    <div 
                      key={b.id} 
                      onClick={() => { setSelectedBill(b); setShowDropdown(false); }}
                      style={{ padding: '0.5rem', background: '#0f172a', borderRadius: '0.25rem', marginBottom: '0.4rem', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid transparent' }}
                      onMouseOver={e => e.currentTarget.style.borderColor = '#38bdf8'}
                      onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                        <span>{b.invoiceNumber}</span>
                        <span>₹{b.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => { setView('account'); setShowDropdown(false); }} style={{ width: '100%', textAlign: 'left', padding: '0.75rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Account Info</button>
              <button onClick={() => { setView('dashboard'); setShowDropdown(false); }} style={{ width: '100%', textAlign: 'left', padding: '0.75rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Dashboard</button>
              <button 
                onClick={logout} 
                style={{ width: '100%', textAlign: 'left', padding: '0.75rem', background: 'transparent', border: 'none', color: '#f87171', borderTop: '1px solid #334155', cursor: 'pointer', marginTop: '0.5rem' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {message && <div style={{ padding: '1rem', background: '#065f46', color: '#34d399', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{message}</div>}

      {view === 'account' ? (
        <section style={{ background: '#1e293b', padding: '3rem', borderRadius: '1.5rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', background: '#38bdf8', color: '#0f172a', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem', fontWeight: 'bold', margin: '0 auto 1.5rem auto' }}>
            {loggedUser.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>{loggedUser}</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Member since April 2026</p>
          
          <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '1rem', textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Username</div>
              <div style={{ fontSize: '1.1rem' }}>@{loggedUser}</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Email</div>
              <div style={{ fontSize: '1.1rem' }}>{userEmail || 'N/A'}</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Phone</div>
              <div style={{ fontSize: '1.1rem' }}>{userPhone || 'N/A'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Address</div>
              <div style={{ fontSize: '1.1rem' }}>{userAddress || 'N/A'}</div>
            </div>
          </div>
          
          <button 
            onClick={() => setView('dashboard')}
            style={{ marginTop: '2rem', background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.8rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Back to Dashboard
          </button>
        </section>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <section style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#38bdf8' }}>Product Catalog</h2>
            <input 
              type="text" 
              placeholder="Search catalog..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', background: '#0f172a', border: 'none', color: 'white' }}
            />
            <div style={{ display: 'grid', gap: '1rem' }}>
              {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#334155', borderRadius: '0.5rem' }}>
                  <div><strong>{p.name}</strong><br/><span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>₹{p.price} | Stock: {p.stock}</span></div>
                  <button onClick={() => addToCart(p)} disabled={p.stock <= 0} style={{ padding: '0.5rem 0.8rem', background: '#38bdf8', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: '#0f172a' }}>Add</button>
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem', height: 'fit-content' }}>
            <h2 style={{ marginBottom: '1rem', color: '#818cf8' }}>Active Cart</h2>
            {cart.length === 0 ? <p style={{ color: '#64748b' }}>Your cart is empty.</p> : (
              <>
                {cart.map(item => <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>{item.product.name} x {item.quantity}</span><span>₹{item.price * item.quantity}</span></div>)}
                <div style={{ fontSize: '1.5rem', marginTop: '1.5rem', textAlign: 'right', fontWeight: 'bold' }}>Total: ₹{cart.reduce((sum, i) => sum + (i.price * i.quantity), 0)}</div>
                <button onClick={createBill} style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', background: '#818cf8', border: 'none', borderRadius: '0.5rem', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Generate Bill</button>
                <button 
                  onClick={() => window.print()}
                  style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', background: 'transparent', border: '1px solid #475569', borderRadius: '0.5rem', color: '#94a3b8', cursor: 'pointer' }}
                >
                  Print Invoice
                </button>
              </>
            )}
          </section>
        </div>
      )}

      {selectedBill && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '1.5rem', width: '90%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#38bdf8' }}>Invoice Details</h2>
              <button onClick={() => setSelectedBill(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#94a3b8' }}>Invoice ID:</span>
                <strong>{selectedBill.invoiceNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Date:</span>
                <span>{new Date(selectedBill.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', padding: '1rem 0' }}>
              {selectedBill.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <div>{item.product.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>₹{item.price} x {item.quantity}</div>
                  </div>
                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
              <span>Total Amount:</span>
              <span>₹{selectedBill.totalAmount}</span>
            </div>

            <button 
              onClick={() => window.print()}
              style={{ width: '100%', marginTop: '2rem', padding: '1rem', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Print This Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default App
