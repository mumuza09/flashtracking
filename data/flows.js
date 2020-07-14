[
    {
        "id": "3bc200a7.a2eba",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": ""
    },
    {
        "id": "dee0c5ef.eda1d8",
        "type": "tab",
        "label": "gafana",
        "disabled": false,
        "info": ""
    },
    {
        "id": "80c8d47f.f69618",
        "type": "tab",
        "label": "SCB",
        "disabled": false,
        "info": ""
    },
    {
        "id": "610e8f33.55bd",
        "type": "tab",
        "label": "google place",
        "disabled": false,
        "info": ""
    },
    {
        "id": "4badf773.5c79e8",
        "type": "tab",
        "label": "Flow 2",
        "disabled": false,
        "info": ""
    },
    {
        "id": "72433266.484f6c",
        "type": "tab",
        "label": "voiceAi",
        "disabled": false,
        "info": ""
    },
    {
        "id": "c282b2b9.575a1",
        "type": "MySQLdatabase",
        "z": "",
        "host": "server8.sourcecode.co.th",
        "port": "3306",
        "db": "radius",
        "tz": ""
    },
    {
        "id": "1a1794ae.a751eb",
        "type": "MySQLdatabase",
        "z": "",
        "host": "mobile.gaizers.com",
        "port": "3306",
        "db": "strapi",
        "tz": ""
    },
    {
        "id": "138f402e.21398",
        "type": "postgresDB",
        "z": "",
        "name": "mobile.gaizer.com",
        "host": "127.0.0.1",
        "port": "5432",
        "database": "postgres",
        "ssl": false,
        "max": "10",
        "min": 1,
        "idle": "1000"
    },
    {
        "id": "69c8997d.ebf208",
        "type": "mysql",
        "z": "3bc200a7.a2eba",
        "d": true,
        "mydb": "c282b2b9.575a1",
        "name": "",
        "x": 330,
        "y": 199,
        "wires": [
            [
                "976fb808.2c3528"
            ]
        ]
    },
    {
        "id": "25649c0d.d63fc4",
        "type": "inject",
        "z": "3bc200a7.a2eba",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 140,
        "y": 80,
        "wires": [
            [
                "4be866e7.572048"
            ]
        ]
    },
    {
        "id": "4be866e7.572048",
        "type": "function",
        "z": "3bc200a7.a2eba",
        "name": "query",
        "func": "msg.topic =\"select * from szdowntimelog where datetimeup != '0000-00-00 00:00:00' and szdtlogid between 2824001 and 2824624 order by szdtlogid\"\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 150,
        "y": 200,
        "wires": [
            [
                "69c8997d.ebf208"
            ]
        ]
    },
    {
        "id": "976fb808.2c3528",
        "type": "function",
        "z": "3bc200a7.a2eba",
        "name": "gen query",
        "func": "var arr = msg.payload;\nvar listQuery = [];\nvar query;\nvar dataMap = {};\nfor(row of arr)\n{\n    query = \"SELECT '\"+row.szdtlogid+\"',count(rad.RadAcctId) from radacct rad where rad.CalledStationId = '\"+row.apmac+\"' and rad.AcctStartTime < '\"+row.datetimedown+\"' and (rad.AcctStopTime BETWEEN '\"+row.datetimedown+\"' and '\"+row.datetimeup+\"' or rad.AcctStopTime is null or rad.AcctStopTime > '\"+row.datetimeup+\"' )\";\n    listQuery.push({payload:row.szdtlogid,topic:query});\n    // listQuery.push(new Date(row.datetimedown).toISOString());\n    // listQuery.push(row.datetimedown);\n    dataMap[query] = row.szdtlogid;\n}\nflow.set(\"map\",dataMap);\nflow.set(\"data\",listQuery);\nflow.set(\"index\",0);\nflow.set(\"rawData\",msg.payload);\n\nmsg.topic = \"Build message\";\nmsg.payload = \"Success\"\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 580,
        "y": 200,
        "wires": [
            []
        ]
    },
    {
        "id": "48370fca.ee207",
        "type": "mysql",
        "z": "3bc200a7.a2eba",
        "mydb": "c282b2b9.575a1",
        "name": "",
        "x": 690,
        "y": 340,
        "wires": [
            [
                "73da725.ea33d8c"
            ]
        ]
    },
    {
        "id": "a5e9e2dc.e28f5",
        "type": "complete",
        "z": "3bc200a7.a2eba",
        "name": "complete query",
        "scope": [
            "976fb808.2c3528",
            "73da725.ea33d8c"
        ],
        "uncaught": false,
        "x": 100,
        "y": 360,
        "wires": [
            [
                "107dae93.87e6c1"
            ]
        ]
    },
    {
        "id": "d2149ffa.d09ab",
        "type": "debug",
        "z": "3bc200a7.a2eba",
        "name": "",
        "active": true,
        "tosidebar": false,
        "console": true,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1140,
        "y": 340,
        "wires": []
    },
    {
        "id": "250736bb.b65d0a",
        "type": "debug",
        "z": "3bc200a7.a2eba",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 850,
        "y": 200,
        "wires": []
    },
    {
        "id": "107dae93.87e6c1",
        "type": "function",
        "z": "3bc200a7.a2eba",
        "name": "set value",
        "func": "var data = flow.get(\"data\");\n\nif(data[flow.get(\"index\")])\n{\n    msg.topic = flow.get(\"data\")[flow.get(\"index\")].topic;\n    flow.set(\"index\",flow.get(\"index\")+1)\n}else\n{\n    msg.topic = \"End\";\n    msg.payload = \"Success\"\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 300,
        "y": 360,
        "wires": [
            [
                "ed3d1ce1.ad0c1"
            ]
        ]
    },
    {
        "id": "ed3d1ce1.ad0c1",
        "type": "switch",
        "z": "3bc200a7.a2eba",
        "name": "",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "neq",
                "v": "End",
                "vt": "str"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 470,
        "y": 360,
        "wires": [
            [
                "48370fca.ee207"
            ],
            [
                "6662672.42bdd98"
            ]
        ]
    },
    {
        "id": "73da725.ea33d8c",
        "type": "function",
        "z": "3bc200a7.a2eba",
        "name": "map value",
        "func": "msg.topic = flow.get(\"map\")[msg.topic];\nvar flowData = flow.get(\"rawData\");\nvar data = flowData[flow.get(\"index\")-1];\ndata.countonline = msg.payload[0][\"count(rad.RadAcctId)\"]\nflow.set(\"rawData\",flowData);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 910,
        "y": 340,
        "wires": [
            [
                "d2149ffa.d09ab"
            ]
        ]
    },
    {
        "id": "6662672.42bdd98",
        "type": "change",
        "z": "3bc200a7.a2eba",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "rawData",
                "tot": "flow"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 580,
        "y": 480,
        "wires": [
            [
                "b9d345d3.7ec478"
            ]
        ]
    },
    {
        "id": "b9d345d3.7ec478",
        "type": "debug",
        "z": "3bc200a7.a2eba",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 840,
        "y": 480,
        "wires": []
    },
    {
        "id": "e0aaef24.52055",
        "type": "http in",
        "z": "dee0c5ef.eda1d8",
        "name": "",
        "url": "/search",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 130,
        "y": 240,
        "wires": [
            [
                "8178524b.515eb"
            ]
        ]
    },
    {
        "id": "44bb84f6.9ea6bc",
        "type": "http response",
        "z": "dee0c5ef.eda1d8",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 1290,
        "y": 260,
        "wires": []
    },
    {
        "id": "8178524b.515eb",
        "type": "function",
        "z": "dee0c5ef.eda1d8",
        "name": "data targets",
        "func": "msg.payload = ['current', 'predict'];\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 450,
        "y": 240,
        "wires": [
            [
                "44bb84f6.9ea6bc"
            ]
        ]
    },
    {
        "id": "5849bb3b.bbd4c4",
        "type": "http in",
        "z": "dee0c5ef.eda1d8",
        "name": "",
        "url": "/query",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 90,
        "y": 440,
        "wires": [
            [
                "57a29e03.f4e5e"
            ]
        ]
    },
    {
        "id": "1448a99b.de1016",
        "type": "change",
        "z": "dee0c5ef.eda1d8",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Access-Control-Allow-Origin\":\"*\",\"Access-Control-Allow-Methods\":\"POST\",\"Access-Control-Allow-Headers\":\"accept, content-type\"}",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 950,
        "y": 440,
        "wires": [
            [
                "d064e83c.b51ea8"
            ]
        ]
    },
    {
        "id": "5984b1b0.07649",
        "type": "function",
        "z": "dee0c5ef.eda1d8",
        "name": "data current",
        "func": "var newVar = [];\nfor(row of msg.payload)\n{\n    if(row.target == \"current\")\n    {\n        newVar.push({\n        \"target\" : \"current\",\n        \"datapoints\" : [ \n                [ 861, 1573100652000 ],\n                [ 767, 1573100702000 ],\n                [ 809, 1573100752000 ],\n                [ 907, 1573100802000 ],\n                [ 624, 1573100852000 ]\n            ]\n        })\n    }else\n        newVar.push(row);\n}\nmsg.payload = newVar;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 510,
        "y": 440,
        "wires": [
            [
                "cb8cbc11.1d033"
            ]
        ]
    },
    {
        "id": "cb8cbc11.1d033",
        "type": "function",
        "z": "dee0c5ef.eda1d8",
        "name": "data predict",
        "func": "var newVar = [];\nfor(row of msg.payload)\n{\n    if(row.target == \"predict\")\n    {\n        newVar.push({\n        \"target\" : \"predict\",\n        \"datapoints\" : [ \n                [ 624, 1573100852000 ],\n                [ 1000, 1573100902000 ],\n                [ 1100, 1573100952000 ],\n                [ 1000, 1573101002000 ],\n                [ 800, 1573101052000 ],\n                [ 900, 1573101102000 ]\n            ]\n        })\n    }else\n        newVar.push(row);\n}\nmsg.payload = newVar;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 710,
        "y": 440,
        "wires": [
            [
                "1448a99b.de1016"
            ]
        ]
    },
    {
        "id": "d064e83c.b51ea8",
        "type": "http response",
        "z": "dee0c5ef.eda1d8",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 1230,
        "y": 380,
        "wires": []
    },
    {
        "id": "57a29e03.f4e5e",
        "type": "change",
        "z": "dee0c5ef.eda1d8",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "payload.targets",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 300,
        "y": 440,
        "wires": [
            [
                "5984b1b0.07649"
            ]
        ]
    },
    {
        "id": "19064348.ba9b8d",
        "type": "http in",
        "z": "80c8d47f.f69618",
        "name": "",
        "url": "/scbQR",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 90,
        "y": 140,
        "wires": [
            [
                "f2d033f4.b2e3c"
            ]
        ]
    },
    {
        "id": "b9efda40.881358",
        "type": "http request",
        "z": "80c8d47f.f69618",
        "name": "gen QR",
        "method": "POST",
        "ret": "obj",
        "paytoqs": false,
        "url": "https://api.partners.scb/partners/sandbox/v1/payment/qrcode/create",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 880,
        "y": 140,
        "wires": [
            [
                "953a89ad.7a24a8",
                "4d813a01.a5f684"
            ]
        ]
    },
    {
        "id": "b16d3423.588db8",
        "type": "http request",
        "z": "80c8d47f.f69618",
        "name": "post auth",
        "method": "POST",
        "ret": "obj",
        "paytoqs": false,
        "url": "https://api.partners.scb/partners/sandbox/v1/oauth/token",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 460,
        "y": 140,
        "wires": [
            [
                "7121ebb2.13d2b4"
            ]
        ]
    },
    {
        "id": "f2d033f4.b2e3c",
        "type": "change",
        "z": "80c8d47f.f69618",
        "name": "set headers",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"resourceOwnerId\":\"l7e754add58faa424886060bffa3cd5adb\",\"requestUId\":\"85230887-e643-4fa4-84b2-4e56709c4ac4\",\"accept-language\":\"EN\"}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "{\"applicationKey\":\"l7e754add58faa424886060bffa3cd5adb\",\"applicationSecret\":\"c3b65693574d46579e58d8fb517a03ac\"}",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 270,
        "y": 140,
        "wires": [
            [
                "b16d3423.588db8"
            ]
        ]
    },
    {
        "id": "953a89ad.7a24a8",
        "type": "debug",
        "z": "80c8d47f.f69618",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1070,
        "y": 40,
        "wires": []
    },
    {
        "id": "3cd94cb7.2ab124",
        "type": "inject",
        "z": "80c8d47f.f69618",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 60,
        "wires": [
            [
                "f2d033f4.b2e3c"
            ]
        ]
    },
    {
        "id": "7121ebb2.13d2b4",
        "type": "function",
        "z": "80c8d47f.f69618",
        "name": "",
        "func": "msg.headers = {\n    \"Content-Type\": \"application/json\",\n    \"authorization\": \"Bearer \"+msg.payload.data.accessToken,\n    \"resourceOwnerId\": \"l7e754add58faa424886060bffa3cd5adb\",\n    \"requestUId\": \"85230887-e643-4fa4-84b2-4e56709c4ac4\",\n    \"accept-language\": \"EN\"\n};\nmsg.payload = {\n    \"qrType\": \"PP\",\n    \"ppType\": \"BILLERID\",\n    \"ppId\": \"1000\",\n    \"amount\": \"100\",\n    \"ref1\": \"01\",\n    \"ref2\": \"02\",\n    \"ref3\": \"03\"\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 670,
        "y": 140,
        "wires": [
            [
                "b9efda40.881358"
            ]
        ]
    },
    {
        "id": "4d813a01.a5f684",
        "type": "http response",
        "z": "80c8d47f.f69618",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 1140,
        "y": 140,
        "wires": []
    },
    {
        "id": "c8cedbfd.f5cde8",
        "type": "inject",
        "z": "610e8f33.55bd",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 160,
        "y": 180,
        "wires": [
            [
                "af41127f.4a3ed"
            ]
        ]
    },
    {
        "id": "26b36059.10654",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": true,
        "url": "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 670,
        "y": 180,
        "wires": [
            [
                "98b310c7.c824e"
            ]
        ]
    },
    {
        "id": "af41127f.4a3ed",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "{}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "payload.location",
                "pt": "msg",
                "to": "13.7764863,100.5578434",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.radius",
                "pt": "msg",
                "to": "5000",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.type",
                "pt": "msg",
                "to": "university",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.keyword",
                "pt": "msg",
                "to": "",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.key",
                "pt": "msg",
                "to": "AIzaSyDhAydn4eZUan6ZVsSuxUa257Lw55u3rv0",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 380,
        "y": 180,
        "wires": [
            [
                "26b36059.10654"
            ]
        ]
    },
    {
        "id": "653f6f38.63138",
        "type": "inject",
        "z": "610e8f33.55bd",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 180,
        "y": 400,
        "wires": [
            [
                "49682612.d2b768"
            ]
        ]
    },
    {
        "id": "4647313d.31c3e",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "POST",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/auth/local/register",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 690,
        "y": 400,
        "wires": [
            [
                "98b310c7.c824e"
            ]
        ]
    },
    {
        "id": "98b310c7.c824e",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1150,
        "y": 400,
        "wires": []
    },
    {
        "id": "49682612.d2b768",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "{}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "payload.username",
                "pt": "msg",
                "to": "test",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.email",
                "pt": "msg",
                "to": "test@gmail.com",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.password",
                "pt": "msg",
                "to": "test",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 400,
        "y": 400,
        "wires": [
            [
                "4647313d.31c3e"
            ]
        ]
    },
    {
        "id": "bbae50fe.60dad",
        "type": "comment",
        "z": "610e8f33.55bd",
        "name": "google",
        "info": "",
        "x": 470,
        "y": 100,
        "wires": []
    },
    {
        "id": "86d104ae.3d2188",
        "type": "comment",
        "z": "610e8f33.55bd",
        "name": "register",
        "info": "",
        "x": 470,
        "y": 320,
        "wires": []
    },
    {
        "id": "79bf2856.946d38",
        "type": "comment",
        "z": "610e8f33.55bd",
        "name": "simple",
        "info": "",
        "x": 490,
        "y": 500,
        "wires": []
    },
    {
        "id": "49729430.5d778c",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/googleplaces",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 690,
        "y": 620,
        "wires": [
            [
                "98b310c7.c824e"
            ]
        ]
    },
    {
        "id": "10b2ec3a.fd31f4",
        "type": "inject",
        "z": "610e8f33.55bd",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 160,
        "y": 620,
        "wires": [
            [
                "9c9243a5.101ce"
            ]
        ]
    },
    {
        "id": "9c9243a5.101ce",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 390,
        "y": 620,
        "wires": [
            [
                "49729430.5d778c"
            ]
        ]
    },
    {
        "id": "98d6803c.1ec54",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "POST",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/placedata",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 990,
        "y": 920,
        "wires": [
            [
                "85325478.07d238"
            ]
        ]
    },
    {
        "id": "8280296c.612188",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 730,
        "y": 920,
        "wires": [
            [
                "a73641d8.ac6ea"
            ]
        ]
    },
    {
        "id": "a73641d8.ac6ea",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set data",
        "func": "var rawData = msg.topic;\nvar reqData = flow.get(\"data\");\nvar data = {};\ndata.custgroup = reqData.placeId;\ndata.type = reqData.type;\ndata.keyword = reqData.keyword;\ndata.name = rawData.name;\ndata.vicinity = rawData.vicinity;\ndata.lat = rawData.geometry.location.lat;\ndata.long = rawData.geometry.location.lng;\ndata.rating = rawData.rating;\ndata.user_ratings_total = rawData.user_ratings_total;\n\ndata.raw_type = rawData.types;\nfor(row of rawData.types)\n    data[row] = true;\n\nmsg.payload = data;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 880,
        "y": 820,
        "wires": [
            [
                "98d6803c.1ec54"
            ]
        ]
    },
    {
        "id": "efcac3ca.056b2",
        "type": "complete",
        "z": "610e8f33.55bd",
        "name": "",
        "scope": [
            "85325478.07d238",
            "71ce326d.9daa1c"
        ],
        "uncaught": false,
        "x": 130,
        "y": 920,
        "wires": [
            [
                "9e9b5ace.599cd8"
            ]
        ]
    },
    {
        "id": "85325478.07d238",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1150,
        "y": 840,
        "wires": []
    },
    {
        "id": "9e9b5ace.599cd8",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set value",
        "func": "var data = flow.get(\"data\")[\"data\"];\n\nif(data[flow.get(\"index\")])\n{\n    msg.topic = data[flow.get(\"index\")]\n    flow.set(\"index\",flow.get(\"index\")+1)\n}else\n{\n    if(flow.get(\"data\")[\"next\"])\n    {\n        msg.topic = \"Do next\";\n        msg.payload = flow.get(\"data\")[\"next\"];\n        \n    }else\n    {\n        msg.topic = \"End\";\n        msg.payload = \"Success\"\n    }\n    \n    \n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 320,
        "y": 920,
        "wires": [
            [
                "1e2fc858.ad27e8"
            ]
        ]
    },
    {
        "id": "1e2fc858.ad27e8",
        "type": "switch",
        "z": "610e8f33.55bd",
        "name": "",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "Do next",
                "vt": "str"
            },
            {
                "t": "neq",
                "v": "End",
                "vt": "str"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 3,
        "x": 510,
        "y": 960,
        "wires": [
            [
                "7415b28b.e0ca2c"
            ],
            [
                "8280296c.612188"
            ],
            [
                "4f2caf8b.52efb"
            ]
        ]
    },
    {
        "id": "4f2caf8b.52efb",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "next custgroup",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 740,
        "y": 1040,
        "wires": []
    },
    {
        "id": "d1c0e845.87c598",
        "type": "inject",
        "z": "610e8f33.55bd",
        "d": true,
        "name": "test",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 110,
        "y": 1140,
        "wires": [
            [
                "1da955f6.524a6a"
            ]
        ]
    },
    {
        "id": "2c41419.54b88be",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": true,
        "url": "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 790,
        "y": 1100,
        "wires": [
            [
                "296ad0e6.d1675"
            ]
        ]
    },
    {
        "id": "b259db1.36eb328",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "{}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "payload.location",
                "pt": "msg",
                "to": "location",
                "tot": "flow"
            },
            {
                "t": "set",
                "p": "payload.radius",
                "pt": "msg",
                "to": "3000",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.type",
                "pt": "msg",
                "to": "subway_station",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.keyword",
                "pt": "msg",
                "to": "",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload.key",
                "pt": "msg",
                "to": "AIzaSyAxV48iv39dioCINu3gOi7Yc_6Uv8_i7Ws",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "type",
                "pt": "flow",
                "to": "payload.type",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 580,
        "y": 1160,
        "wires": [
            [
                "2c41419.54b88be"
            ]
        ]
    },
    {
        "id": "7415b28b.e0ca2c",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "next page",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 620,
        "y": 800,
        "wires": []
    },
    {
        "id": "58699947.21ed28",
        "type": "complete",
        "z": "610e8f33.55bd",
        "d": true,
        "name": "",
        "scope": [
            "7415b28b.e0ca2c"
        ],
        "uncaught": false,
        "x": 110,
        "y": 1060,
        "wires": [
            [
                "e0301da8.b71b9"
            ]
        ]
    },
    {
        "id": "e0301da8.b71b9",
        "type": "change",
        "z": "610e8f33.55bd",
        "d": true,
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "{}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "payload.pagetoken",
                "pt": "msg",
                "to": "data.next",
                "tot": "flow"
            },
            {
                "t": "set",
                "p": "payload.key",
                "pt": "msg",
                "to": "AIzaSyDhAydn4eZUan6ZVsSuxUa257Lw55u3rv0",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 360,
        "y": 1060,
        "wires": [
            [
                "2c41419.54b88be"
            ]
        ]
    },
    {
        "id": "296ad0e6.d1675",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set res to flowdata",
        "func": "var data = msg.payload;\nvar curData = flow.get(\"custGroup\")[flow.get(\"custGroupIndex\")];\n\nvar flowData = {\n    placeId : curData.id,\n    type : flow.get(\"type\"),\n    keyword : \"\",\n    next : data.next_page_token,\n    data : data.results\n};\n\nflow.set(\"data\",flowData);\nflow.set(\"index\",0);\nflow.set(\"custGroupIndex\",flow.get(\"custGroupIndex\")+1);\n    \nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 990,
        "y": 1100,
        "wires": [
            [
                "71ce326d.9daa1c"
            ]
        ]
    },
    {
        "id": "71ce326d.9daa1c",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1190,
        "y": 1100,
        "wires": []
    },
    {
        "id": "219a1640.39f62a",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": true,
        "url": "http://mobile.gaizers.com:1337/custgroups",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 610,
        "y": 1340,
        "wires": [
            [
                "cbe2225.d0fede"
            ]
        ]
    },
    {
        "id": "72316c42.765e84",
        "type": "inject",
        "z": "610e8f33.55bd",
        "d": true,
        "name": "req places",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 120,
        "y": 1340,
        "wires": [
            [
                "7f033b08.11f6f4"
            ]
        ]
    },
    {
        "id": "eed67021.0c53b",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1170,
        "y": 1340,
        "wires": []
    },
    {
        "id": "7f033b08.11f6f4",
        "type": "change",
        "z": "610e8f33.55bd",
        "d": true,
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "{\"_limit\":1000}",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 300,
        "y": 1340,
        "wires": [
            [
                "219a1640.39f62a"
            ]
        ]
    },
    {
        "id": "cbe2225.d0fede",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set res to flowdata",
        "func": "var custGroupData = [];\n\nfor(row of msg.payload)\n{\n    custGroupData.push({\n        id : row.id,\n        lat : row.GPSLatitude,\n        long : row.GPSLongitude\n    });\n}\n\nflow.set(\"custGroup\",custGroupData);\nflow.set(\"custGroupIndex\",0);\n    \nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 830,
        "y": 1340,
        "wires": [
            [
                "eed67021.0c53b"
            ]
        ]
    },
    {
        "id": "bf6c9637.6814f8",
        "type": "complete",
        "z": "610e8f33.55bd",
        "name": "",
        "scope": [
            "4f2caf8b.52efb",
            "7415b28b.e0ca2c",
            "eed67021.0c53b"
        ],
        "uncaught": false,
        "x": 110,
        "y": 1240,
        "wires": [
            [
                "8d46ede8.a1fcd"
            ]
        ]
    },
    {
        "id": "1da955f6.524a6a",
        "type": "change",
        "z": "610e8f33.55bd",
        "d": true,
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "location",
                "pt": "flow",
                "to": "13.7764863,100.5578434",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 300,
        "y": 1140,
        "wires": [
            [
                "b259db1.36eb328"
            ]
        ]
    },
    {
        "id": "8d46ede8.a1fcd",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set value",
        "func": "var data = flow.get(\"custGroup\");\n\nif(data[flow.get(\"custGroupIndex\")])\n{\n    msg.topic = \"Do next\";\n    flow.set(\"location\",data[flow.get(\"custGroupIndex\")].lat+\",\"+data[flow.get(\"custGroupIndex\")].long);\n    \n}else\n{\n    msg.topic = \"End\";\n    msg.payload = \"Success\";\n    \n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 280,
        "y": 1240,
        "wires": [
            [
                "e0eedc03.f9f58"
            ]
        ]
    },
    {
        "id": "e0eedc03.f9f58",
        "type": "switch",
        "z": "610e8f33.55bd",
        "name": "",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "Do next",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "End",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 430,
        "y": 1240,
        "wires": [
            [
                "b259db1.36eb328"
            ],
            [
                "9e8edc02.60745"
            ]
        ]
    },
    {
        "id": "9e8edc02.60745",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "Success",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 660,
        "y": 1260,
        "wires": []
    },
    {
        "id": "e6dcf808.362af8",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/placedata/{{topic}}",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 590,
        "y": 1540,
        "wires": [
            [
                "f8105643.f9eca8"
            ]
        ]
    },
    {
        "id": "a403b76d.3f76b8",
        "type": "inject",
        "z": "610e8f33.55bd",
        "name": "set attribute",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 130,
        "y": 1540,
        "wires": [
            [
                "bc46b5ba.386c88"
            ]
        ]
    },
    {
        "id": "c5d6e9d.f7a4018",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "start",
                "tot": "flow"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 470,
        "y": 1620,
        "wires": [
            [
                "e6dcf808.362af8"
            ]
        ]
    },
    {
        "id": "4cd242fd.23b84c",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1190,
        "y": 1540,
        "wires": []
    },
    {
        "id": "bc46b5ba.386c88",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set loop",
        "rules": [
            {
                "t": "set",
                "p": "start",
                "pt": "flow",
                "to": "12833",
                "tot": "num"
            },
            {
                "t": "set",
                "p": "end",
                "pt": "flow",
                "to": "34654",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 280,
        "y": 1540,
        "wires": [
            [
                "c5d6e9d.f7a4018"
            ]
        ]
    },
    {
        "id": "7a3d7278.6fbbec",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set data",
        "func": "var data = msg.payload;\nfor(row of data.raw_type)\n    data[row] = true;\n\nmsg.payload = data;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 920,
        "y": 1540,
        "wires": [
            [
                "dbe58e14.a399d"
            ]
        ]
    },
    {
        "id": "dbe58e14.a399d",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "PUT",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/placedata/{{topic}}",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 1050,
        "y": 1620,
        "wires": [
            [
                "4cd242fd.23b84c"
            ]
        ]
    },
    {
        "id": "f8105643.f9eca8",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "start",
                "tot": "flow"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 750,
        "y": 1620,
        "wires": [
            [
                "7a3d7278.6fbbec"
            ]
        ]
    },
    {
        "id": "67d878e6.4c9fd8",
        "type": "complete",
        "z": "610e8f33.55bd",
        "name": "",
        "scope": [
            "4cd242fd.23b84c"
        ],
        "uncaught": false,
        "x": 110,
        "y": 1640,
        "wires": [
            [
                "68d2ebe1.eb48b4"
            ]
        ]
    },
    {
        "id": "68d2ebe1.eb48b4",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set value",
        "func": "if(flow.get(\"start\") < flow.get(\"end\"))\n{\n    msg.topic = \"Do next\";\n    flow.set(\"start\",flow.get(\"start\")+1);\n    \n}else\n{\n    msg.topic = \"End\";\n    msg.payload = \"Success\";\n    \n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 280,
        "y": 1660,
        "wires": [
            [
                "58b71842.f7b938"
            ]
        ]
    },
    {
        "id": "58b71842.f7b938",
        "type": "switch",
        "z": "610e8f33.55bd",
        "name": "",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "Do next",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "End",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 350,
        "y": 1720,
        "wires": [
            [
                "c5d6e9d.f7a4018"
            ],
            [
                "8249db0e.c78238"
            ]
        ]
    },
    {
        "id": "8249db0e.c78238",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "Success",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 540,
        "y": 1740,
        "wires": []
    },
    {
        "id": "909c07d6.8e4448",
        "type": "inject",
        "z": "610e8f33.55bd",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 120,
        "y": 1900,
        "wires": [
            [
                "37c9b8e9.325f78"
            ]
        ]
    },
    {
        "id": "37c9b8e9.325f78",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "6900",
                "tot": "num"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 370,
        "y": 1900,
        "wires": [
            [
                "34efdd0.cc2b224"
            ]
        ]
    },
    {
        "id": "34efdd0.cc2b224",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/placedata/{{topic}}",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 570,
        "y": 1900,
        "wires": [
            [
                "8ec3ab2.0df8258"
            ]
        ]
    },
    {
        "id": "14dd265e.365faa",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1010,
        "y": 1900,
        "wires": []
    },
    {
        "id": "8ec3ab2.0df8258",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "clean",
        "func": "var data = msg.payload;\nfor(att in data)\n{\n    if(data[att] == null)\n        delete data[att];\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 790,
        "y": 1900,
        "wires": [
            [
                "14dd265e.365faa"
            ]
        ]
    },
    {
        "id": "4a027454.4d474c",
        "type": "mysql",
        "z": "610e8f33.55bd",
        "mydb": "1a1794ae.a751eb",
        "name": "",
        "x": 590,
        "y": 1400,
        "wires": [
            [
                "cbe2225.d0fede"
            ]
        ]
    },
    {
        "id": "88e27221.c7adc",
        "type": "inject",
        "z": "610e8f33.55bd",
        "name": "req places",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 120,
        "y": 1400,
        "wires": [
            [
                "9d0186b9.68f5e8"
            ]
        ]
    },
    {
        "id": "9d0186b9.68f5e8",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "query",
        "rules": [
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "select * from custgroups",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 350,
        "y": 1400,
        "wires": [
            [
                "4a027454.4d474c"
            ]
        ]
    },
    {
        "id": "474a44bb.78a6fc",
        "type": "inject",
        "z": "610e8f33.55bd",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 1980,
        "wires": [
            [
                "d5cc7a9c.0f09f8"
            ]
        ]
    },
    {
        "id": "5b0ab9fd.0b5a78",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/placedata/{{topic}}",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 610,
        "y": 1980,
        "wires": [
            [
                "8558dcee.e8fb7"
            ]
        ]
    },
    {
        "id": "a9653620.8f36d8",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1290,
        "y": 2240,
        "wires": []
    },
    {
        "id": "8558dcee.e8fb7",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "clean",
        "func": "var data = msg.payload;\nvar newData = {};\nvar looplist = [];\nfor(att in data)\n{\n    switch (att) {\n            case \"id\":\n            case \"type\":\n            case \"raw_type\":\n            case \"lat\":\n            case \"long\":\n            case \"rating\":\n            case \"vicinity\":\n            case \"user_ratings_total\":\n            case \"keyword\":\n            case \"created_at\":\n            case \"updated_at\":\n                delete data[att];\n                break;\n            case \"custgroup\":\n                newData[\"CustGroupID\"] = data[\"custgroup\"].id;\n                newData[\"CustGroupName\"] = data[\"custgroup\"].CustGroupName;\n                break;\n            case \"name\":\n                newData[\"Place_Name\"] = data[\"name\"];delete data[att];\n                break;\n            default:\n                if(data[att])\n                    looplist.push(att);\n                break;\n        }\n    \n}\nmsg.payload = newData;\nflow.set(\"loop2\",newData);\nflow.set(\"loop2list\",looplist);\nflow.set(\"loop2index\",1);\nnewData.type = looplist[0];\nmsg.payload = newData;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 790,
        "y": 2000,
        "wires": [
            [
                "663699fa.2bc538"
            ]
        ]
    },
    {
        "id": "a24065fa.a8cca8",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "POST",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/placecontents",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 1230,
        "y": 2100,
        "wires": [
            [
                "a9653620.8f36d8"
            ]
        ]
    },
    {
        "id": "1c44596e.2ff657",
        "type": "complete",
        "z": "610e8f33.55bd",
        "name": "",
        "scope": [
            "fed3d488.5d6f58"
        ],
        "uncaught": false,
        "x": 90,
        "y": 2060,
        "wires": [
            [
                "7294b9a.c565648"
            ]
        ]
    },
    {
        "id": "7294b9a.c565648",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set value",
        "func": "if(flow.get(\"start\") < flow.get(\"end\"))\n{\n    msg.topic = \"Do next\";\n    flow.set(\"start\",flow.get(\"start\")+1);\n    \n}else\n{\n    msg.topic = \"End\";\n    msg.payload = \"Success\";\n    \n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 240,
        "y": 2100,
        "wires": [
            [
                "7ae7fcc3.9adf04"
            ]
        ]
    },
    {
        "id": "7ae7fcc3.9adf04",
        "type": "switch",
        "z": "610e8f33.55bd",
        "name": "",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "Do next",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "End",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 390,
        "y": 2160,
        "wires": [
            [
                "84f8ef6c.6bd54"
            ],
            [
                "68f23a2b.1074d4"
            ]
        ]
    },
    {
        "id": "68f23a2b.1074d4",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "Success",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 640,
        "y": 2200,
        "wires": []
    },
    {
        "id": "d5cc7a9c.0f09f8",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set loop",
        "rules": [
            {
                "t": "set",
                "p": "start",
                "pt": "flow",
                "to": "55",
                "tot": "num"
            },
            {
                "t": "set",
                "p": "end",
                "pt": "flow",
                "to": "34654",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 260,
        "y": 2000,
        "wires": [
            [
                "84f8ef6c.6bd54"
            ]
        ]
    },
    {
        "id": "84f8ef6c.6bd54",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "start",
                "tot": "flow"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 470,
        "y": 2040,
        "wires": [
            [
                "5b0ab9fd.0b5a78"
            ]
        ]
    },
    {
        "id": "663699fa.2bc538",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1050,
        "y": 2040,
        "wires": [
            [
                "a24065fa.a8cca8"
            ]
        ]
    },
    {
        "id": "91a6516a.79df6",
        "type": "complete",
        "z": "610e8f33.55bd",
        "name": "",
        "scope": [
            "a9653620.8f36d8"
        ],
        "uncaught": false,
        "x": 650,
        "y": 2080,
        "wires": [
            [
                "dccb45e3.6587a8"
            ]
        ]
    },
    {
        "id": "dccb45e3.6587a8",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set value",
        "func": "if(flow.get(\"loop2list\")[flow.get(\"loop2index\")])\n{\n    var newData = flow.get(\"loop2\");\n    newData.type = flow.get(\"loop2list\")[flow.get(\"loop2index\")];\n    msg.payload = newData;\n    msg.topic = \"Do next\";\n    flow.set(\"loop2index\",flow.get(\"loop2index\")+1)\n}else\n{\n    msg.topic = \"End\";\n    msg.payload = \"Success\";\n    \n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 800,
        "y": 2120,
        "wires": [
            [
                "b1b67f30.d5053"
            ]
        ]
    },
    {
        "id": "b1b67f30.d5053",
        "type": "switch",
        "z": "610e8f33.55bd",
        "name": "",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "Do next",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "End",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 850,
        "y": 2200,
        "wires": [
            [
                "663699fa.2bc538"
            ],
            [
                "fed3d488.5d6f58"
            ]
        ]
    },
    {
        "id": "fed3d488.5d6f58",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "Success",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1020,
        "y": 2240,
        "wires": []
    },
    {
        "id": "b5d32445.39bdc8",
        "type": "inject",
        "z": "610e8f33.55bd",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 2340,
        "wires": [
            [
                "7f6670a9.fd1b7"
            ]
        ]
    },
    {
        "id": "b249a02e.beac3",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "start",
                "tot": "flow"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 410,
        "y": 2400,
        "wires": [
            [
                "a4840ef9.d4394"
            ]
        ]
    },
    {
        "id": "a4840ef9.d4394",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/custgroups/{{topic}}",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 590,
        "y": 2400,
        "wires": [
            [
                "cf997caa.1d918"
            ]
        ]
    },
    {
        "id": "bc730ba6.1008b8",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1290,
        "y": 2400,
        "wires": []
    },
    {
        "id": "cf997caa.1d918",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "",
        "func": "var data = msg.payload;\ndata.department_store_count = 0;\ndata.university_count = 0;\ndata.tourist_attraction_count = 0;\ndata.subway_station_count = 0;\nfor(row of data.placedata)\n{\n    if(row.department_store)\n        data.department_store_count++;\n    if(row.university)\n        data.university_count++;\n    if(row.tourist_attraction)\n        data.tourist_attraction_count++;\n    if(row.subway_station)\n        data.subway_station_count++;\n}\ndelete data.placedata;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 750,
        "y": 2400,
        "wires": [
            [
                "3ff8bad8.031fd6"
            ]
        ]
    },
    {
        "id": "7f6670a9.fd1b7",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set loop",
        "rules": [
            {
                "t": "set",
                "p": "start",
                "pt": "flow",
                "to": "1",
                "tot": "num"
            },
            {
                "t": "set",
                "p": "end",
                "pt": "flow",
                "to": "821",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 260,
        "y": 2340,
        "wires": [
            [
                "b249a02e.beac3"
            ]
        ]
    },
    {
        "id": "21af3900.76e048",
        "type": "http request",
        "z": "610e8f33.55bd",
        "name": "",
        "method": "PUT",
        "ret": "obj",
        "paytoqs": false,
        "url": "http://mobile.gaizers.com:1337/custgroups/{{topic}}",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "basic",
        "x": 1110,
        "y": 2400,
        "wires": [
            [
                "bc730ba6.1008b8"
            ]
        ]
    },
    {
        "id": "3ff8bad8.031fd6",
        "type": "change",
        "z": "610e8f33.55bd",
        "name": "set header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTczODg2MzkwLCJleHAiOjE1NzY0NzgzOTB9.xjJqw7N21jTtvbI3GvDM2Jub-W3nNexs1qHYh6hh3Zg\"}",
                "tot": "json"
            },
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "start",
                "tot": "flow"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 930,
        "y": 2400,
        "wires": [
            [
                "21af3900.76e048"
            ]
        ]
    },
    {
        "id": "470d5dc2.ce00b4",
        "type": "complete",
        "z": "610e8f33.55bd",
        "name": "",
        "scope": [
            "bc730ba6.1008b8"
        ],
        "uncaught": false,
        "x": 90,
        "y": 2440,
        "wires": [
            [
                "435c8453.f85e7c"
            ]
        ]
    },
    {
        "id": "435c8453.f85e7c",
        "type": "function",
        "z": "610e8f33.55bd",
        "name": "set value",
        "func": "if(flow.get(\"start\") < flow.get(\"end\"))\n{\n    msg.topic = \"Do next\";\n    flow.set(\"start\",flow.get(\"start\")+1);\n    \n}else\n{\n    msg.topic = \"End\";\n    msg.payload = \"Success\";\n    \n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 240,
        "y": 2480,
        "wires": [
            [
                "f208bbec.c0b7c8"
            ]
        ]
    },
    {
        "id": "f208bbec.c0b7c8",
        "type": "switch",
        "z": "610e8f33.55bd",
        "name": "",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "Do next",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "End",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 390,
        "y": 2540,
        "wires": [
            [
                "b249a02e.beac3"
            ],
            [
                "5d6d47d9.14d498"
            ]
        ]
    },
    {
        "id": "5d6d47d9.14d498",
        "type": "debug",
        "z": "610e8f33.55bd",
        "name": "Success",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 640,
        "y": 2580,
        "wires": []
    },
    {
        "id": "cde342fb.8bbf9",
        "type": "http in",
        "z": "3bc200a7.a2eba",
        "name": "",
        "url": "/api/si/flows/push",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 310,
        "y": 660,
        "wires": [
            [
                "a35b0a18.0545f8"
            ]
        ]
    },
    {
        "id": "a35b0a18.0545f8",
        "type": "http response",
        "z": "3bc200a7.a2eba",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 680,
        "y": 660,
        "wires": []
    },
    {
        "id": "dd148cb3.5ce3c",
        "type": "inject",
        "z": "3bc200a7.a2eba",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 180,
        "y": 820,
        "wires": [
            [
                "5d48b059.e1efc"
            ]
        ]
    },
    {
        "id": "5d48b059.e1efc",
        "type": "function",
        "z": "3bc200a7.a2eba",
        "name": "",
        "func": "var str = \"y0uv8u3r/ppMhb+HptoVv8II5Xv1WoAhY4eymb2+iZ3TYWr3KTHt2cK8ePcEDYXQ7Y0kllv7CjDQghvA8fiy76kScnDRYXZW17qR03rUANsuMhzIu5RoKdn8uf9zc3M/F2E95l6IuWP0YTpedkPwsmNJBpyHRfMpHeXCJCrEH6QI85bfCe4UL/jXaVM7a6vD0V5/8OT2ieWGw/8GXnRvO0UIbJ8mJTJN0l3y4FVDfIxYvcjk+IfQRQ==\";\n// msg.payload = global.get(\"encrypt\")(\"555555555\");\nmsg.payload = global.get(\"decrypt\")(str);\n\n\nvar fs = global.get(\"fs\");\n\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 440,
        "y": 840,
        "wires": [
            [
                "89b8be14.3fccc"
            ]
        ]
    },
    {
        "id": "89b8be14.3fccc",
        "type": "debug",
        "z": "3bc200a7.a2eba",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 700,
        "y": 840,
        "wires": []
    },
    {
        "id": "a3e951bb.ce692",
        "type": "function",
        "z": "4badf773.5c79e8",
        "name": "",
        "func": "var Distance = global.get(\"distance\");\nvar location = {\n  lat: msg.payload.GPSLatitude,\n  lon: msg.payload.GPSLongitude\n};\n\nvar destination = {  lat: 13.756207,  lon: 100.6166162};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยรามคำแหง'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.911745,  lon: 100.5369511};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยสุโขทัยธรรมาธิราช'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7704197,  lon: 100.6515589};var dis = Distance.between(location, destination);msg.payload['สถาบันบัณฑิตพัฒนบริหารศาสตร์'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8188261,  lon: 100.5751203};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยราชภัฏจันทรเกษม'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7338275,  lon: 100.4890718};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยราชภัฏธนบุรี'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7329687,  lon: 100.4872388};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8768065,  lon: 100.5884851};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยราชภัฏพระนคร'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7763012,  lon: 100.5062103};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยราชภัฏสวนสุนันทา'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7146602,  lon: 100.537155};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.2288336,  lon: 100.9560052};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7900686,  lon: 100.4911397};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7966255,  lon: 100.2979375};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.9204314,  lon: 100.6234554};var dis = Distance.between(location, destination);msg.payload['โรงเรียนนายเรืออากาศนวมินทกษัตริยาธิราช'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7688845,  lon: 100.5295076};var dis = Distance.between(location, destination);msg.payload['วิทยาลัยพยาบาลกองทัพบก'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7087498,  lon: 100.4836768};var dis = Distance.between(location, destination);msg.payload['วิทยาลัยพยาบาลกองทัพเรือ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7427432,  lon: 100.5337794};var dis = Distance.between(location, destination);msg.payload['วิทยาลัยพยาบาลตำรวจ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.909635,  lon: 100.6177546};var dis = Distance.between(location, destination);msg.payload['วิทยาลัยพยาบาลทหารอากาศ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7692046,  lon: 100.5283342};var dis = Distance.between(location, destination);msg.payload['วิทยาลัยแพทยศาสตร์พระมงกุฎเกล้า'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7396223,  lon: 100.5358954};var dis = Distance.between(location, destination);msg.payload['จุฬาลงกรณ์มหาวิทยาลัย'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8475739,  lon: 100.5674304};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเกษตรศาสตร์ บางเขน'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.65103,  lon: 100.4931915};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี บางมด'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8201538,  lon: 100.5120509};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7574331,  lon: 100.487794};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยธรรมศาสตร์ ท่าพระจันทร์'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7819174,  lon: 100.5057685};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยนวมินทราธิราช'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.755227,  lon: 100.4878208};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7999734,  lon: 100.2902945};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยมหามกุฏราชวิทยาลัย'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7945827,  lon: 100.3212284};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยมหิดล'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7544972,  lon: 100.5422207};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยศรีนครินทรวิโรฒ ประสานมิตร'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.752526,  lon: 100.4875713};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยศิลปากร วังท่าพระ (รวมถึงพื้นที่สำนักงานอธิการบดี ตลิ่งชัน)'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7765448,  lon: 100.509144};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยสวนดุสิต'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7283225,  lon: 100.7754019};var dis = Distance.between(location, destination);msg.payload['สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7116907,  lon: 100.5796904};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยกรุงเทพ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7689958,  lon: 100.3442414};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยกรุงเทพธนบุรี'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7232842,  lon: 100.8002913};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยกรุงเทพสุวรรณภูมิ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8732169,  lon: 100.5977063};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเกริก'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7392887,  lon: 100.6242985};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเกษมบัณฑิต'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8422351,  lon: 100.8533307};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเทคโนโลยีมหานคร'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7162251,  lon: 100.344501};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยธนบุรี'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.870813,  lon: 100.5493794};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยธุรกิจบัณฑิตย์'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8969439,  lon: 100.619251};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยนอร์ทกรุงเทพ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8971492,  lon: 100.5700335};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยรังสิต'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7801488,  lon: 100.6357528};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยรัตนบัณฑิต'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.8548503,  lon: 100.5833922};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยศรีปทุม'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7206191,  lon: 100.4511258};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยสยาม'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.7798729,  lon: 100.5581232};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยหอการค้าไทย'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.6119403,  lon: 100.8028047};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยอัสสัมชัญ'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\nvar destination = {  lat: 13.707347,  lon: 100.3539335};var dis = Distance.between(location, destination);msg.payload['มหาวิทยาลัยเอเชียอาคเนย์'] = (dis.human_readable().unit == 'm') ? dis.human_readable().distance/1000:dis.human_readable().distance*1;\n\n\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 410,
        "y": 320,
        "wires": [
            [
                "3b5561f8.a935ee"
            ]
        ]
    },
    {
        "id": "9eb8b2ee.5a07a",
        "type": "inject",
        "z": "4badf773.5c79e8",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 160,
        "y": 120,
        "wires": [
            [
                "96ba2239.867f6"
            ]
        ]
    },
    {
        "id": "4c2694e3.a2abdc",
        "type": "debug",
        "z": "4badf773.5c79e8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 770,
        "y": 220,
        "wires": []
    },
    {
        "id": "96ba2239.867f6",
        "type": "file in",
        "z": "4badf773.5c79e8",
        "name": "",
        "filename": "cust.csv",
        "format": "lines",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "x": 180,
        "y": 240,
        "wires": [
            [
                "25f8986d.016778"
            ]
        ]
    },
    {
        "id": "25f8986d.016778",
        "type": "csv",
        "z": "4badf773.5c79e8",
        "name": "",
        "sep": ",",
        "hdrin": true,
        "hdrout": "",
        "multi": "one",
        "ret": "\\n",
        "temp": "",
        "skip": "0",
        "strings": true,
        "x": 170,
        "y": 320,
        "wires": [
            [
                "a3e951bb.ce692"
            ]
        ]
    },
    {
        "id": "3b5561f8.a935ee",
        "type": "file",
        "z": "4badf773.5c79e8",
        "name": "",
        "filename": "out.json",
        "appendNewline": true,
        "createDir": false,
        "overwriteFile": "false",
        "encoding": "none",
        "x": 600,
        "y": 280,
        "wires": [
            [
                "4c2694e3.a2abdc"
            ]
        ]
    },
    {
        "id": "1b7e48c3.e2dc47",
        "type": "inject",
        "z": "4badf773.5c79e8",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 120,
        "y": 520,
        "wires": [
            [
                "8be892f7.dc54e",
                "3e821e5a.162322"
            ]
        ]
    },
    {
        "id": "2d186125.69cb6e",
        "type": "debug",
        "z": "4badf773.5c79e8",
        "name": "",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 870,
        "y": 420,
        "wires": []
    },
    {
        "id": "df4a95d2.7a0378",
        "type": "http request",
        "z": "4badf773.5c79e8",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": false,
        "url": "https://api.smartrms.net/api/foxpro/check-request",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 550,
        "y": 520,
        "wires": [
            [
                "88b67863.5b3aa8"
            ]
        ]
    },
    {
        "id": "20dd33a5.fe9f5c",
        "type": "file",
        "z": "4badf773.5c79e8",
        "name": "",
        "filename": "rms.log",
        "appendNewline": true,
        "createDir": false,
        "overwriteFile": "false",
        "encoding": "none",
        "x": 940,
        "y": 540,
        "wires": [
            [
                "2ca94ba7.507ad4"
            ]
        ]
    },
    {
        "id": "2ca94ba7.507ad4",
        "type": "debug",
        "z": "4badf773.5c79e8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1190,
        "y": 540,
        "wires": []
    },
    {
        "id": "8be892f7.dc54e",
        "type": "change",
        "z": "4badf773.5c79e8",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "reqTime",
                "pt": "flow",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 360,
        "y": 520,
        "wires": [
            [
                "df4a95d2.7a0378"
            ]
        ]
    },
    {
        "id": "88b67863.5b3aa8",
        "type": "function",
        "z": "4badf773.5c79e8",
        "name": "",
        "func": "reqTime = new Date(flow.get(\"reqTime\"));\nresTime = new Date();\n// useTime : resTime-reqTime;\nmsg.payload = {\n    requertTime : reqTime,\n    responseTime : resTime,\n    useageTime : (resTime-reqTime)/1000,\n    result : msg.payload\n};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 750,
        "y": 540,
        "wires": [
            [
                "20dd33a5.fe9f5c",
                "2d186125.69cb6e"
            ]
        ]
    },
    {
        "id": "aa504a41.771588",
        "type": "file",
        "z": "4badf773.5c79e8",
        "name": "",
        "filename": "rmsError.log",
        "appendNewline": true,
        "createDir": false,
        "overwriteFile": "false",
        "encoding": "none",
        "x": 890,
        "y": 820,
        "wires": [
            [
                "4778e8be.9b8a48"
            ]
        ]
    },
    {
        "id": "d2ad06d0.6495e8",
        "type": "catch",
        "z": "4badf773.5c79e8",
        "name": "",
        "scope": null,
        "uncaught": false,
        "x": 140,
        "y": 800,
        "wires": [
            [
                "fe26f9ae.57c0c8"
            ]
        ]
    },
    {
        "id": "fe26f9ae.57c0c8",
        "type": "function",
        "z": "4badf773.5c79e8",
        "name": "",
        "func": "reqTime = new Date(flow.get(\"reqTime\"));\nresTime = new Date();\nmsg.payload = {\n    requertTime : reqTime,\n    responseTime : resTime,\n    useageTime : (resTime-reqTime)/1000,\n    resultCode : 50000\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 470,
        "y": 820,
        "wires": [
            [
                "aa504a41.771588"
            ]
        ]
    },
    {
        "id": "b728ed5c.0a4b3",
        "type": "http request",
        "z": "4badf773.5c79e8",
        "name": "",
        "method": "GET",
        "ret": "obj",
        "paytoqs": false,
        "url": "https://api.smartrms.net/api/foxpro/check-request-sql",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 550,
        "y": 640,
        "wires": [
            [
                "3e33f140.4bb2be"
            ]
        ]
    },
    {
        "id": "b027ba9.f8dbd48",
        "type": "file",
        "z": "4badf773.5c79e8",
        "name": "",
        "filename": "rmsSQL.log",
        "appendNewline": true,
        "createDir": false,
        "overwriteFile": "false",
        "encoding": "none",
        "x": 950,
        "y": 660,
        "wires": [
            [
                "46ed6bf6.4858b4"
            ]
        ]
    },
    {
        "id": "46ed6bf6.4858b4",
        "type": "debug",
        "z": "4badf773.5c79e8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1190,
        "y": 660,
        "wires": []
    },
    {
        "id": "3e33f140.4bb2be",
        "type": "function",
        "z": "4badf773.5c79e8",
        "name": "",
        "func": "reqTime = new Date(flow.get(\"reqTime2\"));\nresTime = new Date();\n// useTime : resTime-reqTime;\nmsg.payload = {\n    requertTime : reqTime,\n    responseTime : resTime,\n    useageTime : (resTime-reqTime)/1000,\n    result : msg.payload\n};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 750,
        "y": 660,
        "wires": [
            [
                "b027ba9.f8dbd48"
            ]
        ]
    },
    {
        "id": "3e821e5a.162322",
        "type": "change",
        "z": "4badf773.5c79e8",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "reqTime2",
                "pt": "flow",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 370,
        "y": 640,
        "wires": [
            [
                "b728ed5c.0a4b3"
            ]
        ]
    },
    {
        "id": "4778e8be.9b8a48",
        "type": "debug",
        "z": "4badf773.5c79e8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1180,
        "y": 820,
        "wires": []
    },
    {
        "id": "208956f2.5e8e4a",
        "type": "inject",
        "z": "72433266.484f6c",
        "name": "",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 240,
        "y": 140,
        "wires": [
            [
                "dafb49ca.d24bf8"
            ]
        ]
    },
    {
        "id": "1f24a34a.ba284d",
        "type": "debug",
        "z": "72433266.484f6c",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1000,
        "y": 260,
        "wires": []
    },
    {
        "id": "dafb49ca.d24bf8",
        "type": "function",
        "z": "72433266.484f6c",
        "name": "",
        "func": "global.get(\"text2speech\")(\"ทดสอบ\");\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 540,
        "y": 260,
        "wires": [
            [
                "1f24a34a.ba284d"
            ]
        ]
    },
    {
        "id": "d04e6129.b6401",
        "type": "debug",
        "z": "72433266.484f6c",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 450,
        "y": 560,
        "wires": []
    },
    {
        "id": "bc5a3df0.d7794",
        "type": "http response",
        "z": "72433266.484f6c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 660,
        "y": 400,
        "wires": []
    },
    {
        "id": "39880aff.eee606",
        "type": "http in",
        "z": "72433266.484f6c",
        "name": "",
        "url": "/voiceai",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 210,
        "y": 360,
        "wires": [
            [
                "d04e6129.b6401",
                "6c987dcc.4a49e4"
            ]
        ]
    },
    {
        "id": "6c987dcc.4a49e4",
        "type": "function",
        "z": "72433266.484f6c",
        "name": "",
        "func": "global.get(\"text2speech\")(msg.payload.msg);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 390,
        "y": 360,
        "wires": [
            [
                "bc5a3df0.d7794"
            ]
        ]
    }
]