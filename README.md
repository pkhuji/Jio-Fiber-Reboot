# Jio-Fiber-Reboot
Jio Fiber Router Reboot

### H3 CLI Options list

ip  
ipAddress  
&nbsp;&nbsp;&nbsp;IP address of jio router.

pwd  
password  
p  
&nbsp;&nbsp;&nbsp;Pasword of admin account.

user  
username  
u  
&nbsp;&nbsp;&nbsp;Username of admin account. (Optional. Default: admin)

url
&nbsp;&nbsp;&nbsp;URL of router login page. (Optional. Default: _http://${ip}/platform.cgi_ )

tries  
t  
&nbsp;&nbsp;&nbsp;Maximum tries. (Optional. Default: 1)

wait  
w  
&nbsp;&nbsp;&nbsp;Wait (in seconds) between tries. (Optional. Default: 1 second)

Example:  
`node jioFiberReboot.js ip=192.168.29.1 pwd=password t=2 w=5`
