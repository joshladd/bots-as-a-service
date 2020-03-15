@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  tifu-listener startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Add default JVM options here. You can also use JAVA_OPTS and TIFU_LISTENER_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\tifu-listener-0.0.1-SNAPSHOT.jar;%APP_HOME%\lib\ktor-server-netty-1.3.0.jar;%APP_HOME%\lib\ktor-html-builder-1.3.0.jar;%APP_HOME%\lib\ktor-server-host-common-1.3.0.jar;%APP_HOME%\lib\ktor-server-core-1.3.0.jar;%APP_HOME%\lib\kotlin-css-jvm-1.0.0-pre.31-kotlin-1.2.41.jar;%APP_HOME%\lib\kotlin-stdlib-jdk8-1.3.61.jar;%APP_HOME%\lib\logback-classic-1.2.1.jar;%APP_HOME%\lib\ktor-client-core-1.3.0.jar;%APP_HOME%\lib\ktor-client-core-jvm-1.3.0.jar;%APP_HOME%\lib\JRAW-1.1.0.jar;%APP_HOME%\lib\ktor-http-cio-jvm-1.3.0.jar;%APP_HOME%\lib\ktor-http-jvm-1.3.0.jar;%APP_HOME%\lib\ktor-network-1.3.0.jar;%APP_HOME%\lib\ktor-utils-jvm-1.3.0.jar;%APP_HOME%\lib\kotlin-stdlib-jdk7-1.3.61.jar;%APP_HOME%\lib\ktor-io-jvm-1.3.0.jar;%APP_HOME%\lib\atomicfu-0.14.1.jar;%APP_HOME%\lib\kotlin-reflect-1.3.61.jar;%APP_HOME%\lib\kotlinx-html-jvm-0.6.12.jar;%APP_HOME%\lib\kotlin-stdlib-1.3.61.jar;%APP_HOME%\lib\slf4j-api-1.7.26.jar;%APP_HOME%\lib\kotlinx-coroutines-jdk8-1.3.3.jar;%APP_HOME%\lib\kotlinx-coroutines-core-1.3.3.jar;%APP_HOME%\lib\netty-codec-http2-4.1.43.Final.jar;%APP_HOME%\lib\alpn-api-1.1.3.v20160715.jar;%APP_HOME%\lib\netty-transport-native-kqueue-4.1.43.Final.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.43.Final.jar;%APP_HOME%\lib\logback-core-1.2.1.jar;%APP_HOME%\lib\ktor-http-cio-1.3.0.jar;%APP_HOME%\lib\ktor-http-1.3.0.jar;%APP_HOME%\lib\ktor-utils-1.3.0.jar;%APP_HOME%\lib\ktor-io-1.3.0.jar;%APP_HOME%\lib\kotlinx-coroutines-core-common-1.3.3.jar;%APP_HOME%\lib\kotlin-css-1.0.0-pre.31-kotlin-1.2.41.jar;%APP_HOME%\lib\kotlin-stdlib-common-1.3.61.jar;%APP_HOME%\lib\config-1.3.1.jar;%APP_HOME%\lib\moshi-1.6.0.jar;%APP_HOME%\lib\okhttp-3.10.0.jar;%APP_HOME%\lib\annotations-13.0.jar;%APP_HOME%\lib\netty-codec-http-4.1.43.Final.jar;%APP_HOME%\lib\netty-handler-4.1.43.Final.jar;%APP_HOME%\lib\netty-codec-4.1.43.Final.jar;%APP_HOME%\lib\netty-transport-native-unix-common-4.1.43.Final.jar;%APP_HOME%\lib\netty-transport-4.1.43.Final.jar;%APP_HOME%\lib\netty-buffer-4.1.43.Final.jar;%APP_HOME%\lib\netty-resolver-4.1.43.Final.jar;%APP_HOME%\lib\netty-common-4.1.43.Final.jar;%APP_HOME%\lib\okio-1.14.0.jar

@rem Execute tifu-listener
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %TIFU_LISTENER_OPTS%  -classpath "%CLASSPATH%" io.ktor.server.netty.EngineMain %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable TIFU_LISTENER_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%TIFU_LISTENER_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega