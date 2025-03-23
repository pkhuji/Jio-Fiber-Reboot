# Jio-Fiber-Reboot
Jio Fiber Router Reboot

CLI Options list
  ip
  ipAddress
    IP address of jio router.

  pwd
  password
  p
    Pasword of admin account.

  user
  username
  u
    Username of admin account. (Optional. Default: admin)

  url
    URL of router login page. (Optional. Default: http://${ip}/platform.cgi)

  tries
  t
    Maximum tries. (Optional. Default: 1)

  wait
  w
    Wait (in seconds) between tries. (Optional. Default: 1 second)

Example: 
  node jioFiberReboot.js ip=192.168.29.1 pwd=password t=2 w=5
