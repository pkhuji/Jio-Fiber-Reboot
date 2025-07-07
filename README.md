<<<<<<< HEAD
## Jio-Fiber-Reboot

Nodejs script to reboot Jio-Fiber router.
You can run it with Nodejs **v16** or above and use cron job for routine reboot.

Example:
node index.mjs -ip=192.168.29.1 -pwd=password -t=2 -w=5

#### CLI Options List

-ip | -ipAddress
IP address of Jio-Fiber router.

-pwd | -password | -p
Pasword of admin account of Jio-Fiber router.

-user | -username | -u
Username of admin account of Jio-Fiber router. (Default: admin)

-url
URL of router login page. (Default: http://${ip}/platform.cgi )

-tries | -t
Maximum tries. (Default: 1)

-wait | -w
Wait (in seconds) between tries. (Default: 1)

-timeout | -tout  
Request timout (in seconds). (Default: 60)
=======
# Jio-Fiber-Reboot

Nodejs script to reboot Jio-Fiber router.
You can run it with Nodejs v16 or above and use cron job for routine reboot.

Example:

`node jioFiberReboot.js ip=192.168.29.1 pwd=password t=2 w=5`

### CLI Options List

ip  
ipAddress  
&nbsp;&nbsp;&nbsp;IP address of Jio-Fiber router.

pwd  
password  
p  
&nbsp;&nbsp;&nbsp;Pasword of admin account of Jio-Fiber router.

user  
username  
u  
&nbsp;&nbsp;&nbsp;Username of admin account of Jio-Fiber router. (Optional. Default: admin)

url  
&nbsp;&nbsp;&nbsp;URL of router login page. (Optional. Default: _http://${ip}/platform.cgi_ )

tries  
t  
&nbsp;&nbsp;&nbsp;Maximum tries. (Optional. Default: 1)

wait  
w  
&nbsp;&nbsp;&nbsp;Wait (in seconds) between tries. (Optional. Default: 1 second)

timeout  
tout  
&nbsp;&nbsp;&nbsp;Request timout in seconds. (Optional. Default: 60)
>>>>>>> c432db1363a7cb6b1b6c88775a2af46453fb032e
