[
    {
        "id": "3bc200a7.a2eba",
        "type": "tab",
        "label": "flash",
        "disabled": false,
        "info": ""
    },
    {
        "id": "94d0ac09.5e696",
        "type": "http in",
        "z": "3bc200a7.a2eba",
        "name": "",
        "url": "/checkflash",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 140,
        "y": 140,
        "wires": [
            [
                "e7a38b5b.51f0f8"
            ]
        ]
    },
    {
        "id": "e7a38b5b.51f0f8",
        "type": "function",
        "z": "3bc200a7.a2eba",
        "name": "",
        "func": "msg.payload = {\n    \"search\" : msg.payload.trackNo\n}\nmsg.headers = {\n    \"Content-Type\" : \"multipart/form-data\"\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 340,
        "y": 140,
        "wires": [
            [
                "e7cc4ff5.a840b"
            ]
        ]
    },
    {
        "id": "7fd40c19.ce5184",
        "type": "debug",
        "z": "3bc200a7.a2eba",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 750,
        "y": 240,
        "wires": []
    },
    {
        "id": "62d04bf5.ec30d4",
        "type": "http response",
        "z": "3bc200a7.a2eba",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 1070,
        "y": 140,
        "wires": []
    },
    {
        "id": "e7cc4ff5.a840b",
        "type": "http request",
        "z": "3bc200a7.a2eba",
        "name": "",
        "method": "POST",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "https://www.flashexpress.co.th/tools/get-route/",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 510,
        "y": 140,
        "wires": [
            [
                "7fd40c19.ce5184",
                "f7a765b0.b38ab8"
            ]
        ]
    },
    {
        "id": "c83ea49a.7d85a8",
        "type": "template",
        "z": "3bc200a7.a2eba",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "html",
        "syntax": "mustache",
        "template": "<html>\n  <head>\n      <style media=\"screen\">\n      body { background: #ECEFF1; color: rgba(0,0,0,0.87); font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; }\n      #message { background: white; max-width: 750px; margin: 100px auto 16px; padding: 32px 24px; border-radius: 3px; }\n      #message h2 { color: #ffa100; font-weight: bold; font-size: 16px; margin: 0 0 8px; }\n      #message h1 { font-size: 22px; font-weight: 300; color: rgba(0,0,0,0.6); margin: 0 0 16px;}\n      #message p { line-height: 140%; margin: 16px 0 24px; font-size: 14px; }\n      #message a { display: block; text-align: center; background: #039be5; text-transform: uppercase; text-decoration: none; color: white; padding: 16px; border-radius: 4px; }\n      #message, #message a { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }\n      #load { color: rgba(0,0,0,0.4); text-align: center; font-size: 13px; }\n      @media (max-width: 600px) {\n        body, #message { margin-top: 0; background: white; box-shadow: none; }\n        body { border-top: 16px solid #ffa100; }\n      }\n    </style>\n  </head>\n  <body>\n    <div id=\"message\" style=\"text-align: center;\">\n     <h3 style=\"color: red;\">{{{payload.mainStats}}}</h3>\n     <h1>{{{payload.trackNo}}}</h1>\n<table style=\"margin-left: auto;margin-right: auto;\">\n  \n  {{{payload.subTrack}}}\n\n</table>\n    </div>\n    </body>\n</html>\n      \n      \n      \n      ",
        "output": "str",
        "x": 890,
        "y": 140,
        "wires": [
            [
                "62d04bf5.ec30d4"
            ]
        ]
    },
    {
        "id": "f7a765b0.b38ab8",
        "type": "function",
        "z": "3bc200a7.a2eba",
        "name": "",
        "func": "if(msg.payload.code == 1 && msg.payload.message.list.length > 0)\n{\n    var tracks = \"\";\n    for(i=0;i<msg.payload.message.list[0].routes.length;i++)\n    {\n        tracks = tracks +\"<tr><td>\"+ (msg.payload.message.list[0].routes.length-i) +\".\"+msg.payload.message.list[0].routes[i].message + \"</td>\"\n        tracks = tracks +\"<td>\"+ msg.payload.message.list[0].routes[i].routed_at + \"</td></tr>\" \n    }\n    msg.payload = {\n        trackNo : msg.payload.message.list[0].pno,\n        mainStats : msg.payload.message.list[0].state_text,\n        subTrack : tracks\n    }\n}else\n{\n    msg.payload = {\n        trackNo : \"ไม่พบข้อมูลพัสดุ โปรดตรวจสอบว่าป้อนเลขถูกต้องหรือไม่\"\n    }\n}\n\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 720,
        "y": 140,
        "wires": [
            [
                "c83ea49a.7d85a8"
            ]
        ]
    }
]