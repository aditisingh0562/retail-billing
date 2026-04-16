@REM Maven Wrapper startup batch script
@REM -------------------------------------------------------------------
@echo off
setlocal

set JAVA_HOME=C:\Program Files\Java\jdk-17
set "PATH=%JAVA_HOME%\bin;%PATH%"

set "WRAPPER_JAR=%~dp0.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_PROPERTIES=%~dp0.mvn\wrapper\maven-wrapper.properties"

@REM Download Maven if needed
if not exist "%JAVA_HOME%\bin\java.exe" (
    echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
    exit /b 1
)

"%JAVA_HOME%\bin\java.exe" -Dmaven.multiModuleProjectDirectory="%~dp0." -Dmaven.home="%~dp0.mvn\wrapper" -classpath "%WRAPPER_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*
