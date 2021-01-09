from serverW.Models import Model as mod
from flask import request

class Widgets():

    def __init__(self):

        self.foo = mod()

    def index(self):
       
        res = self.foo.getAll("widgets")
        return res
    
    def getWidgets(self):
        idWidgets = request.args.get("id")
        print('idWidgets', idWidgets)
        if idWidgets is None:
            res = self.foo.get("widgets")
            return res
        else:
            res = self.foo.get("widgets", idWidgets)
            return res

    def postWidgets(self):
        data = {
            "name": request.args.get("name"),
        }
        self.foo.add("widgets", data)
    
    def updateWidgets(self):
        Widgets = self.foo.get("widgets", request.args.get('id'))
       
        name = request.args.get('name')

        if name is None:
            name = Widgets[1]
       
        data = {
            "id": request.args.get("id"),
            "name": name,
        }
        self.foo.update("widgets", data)
    
    def deleteWidgets(self):
        id = request.args.get("id")
        self.foo.delete("widgets", id)
        
    def getUserId(self):  
       
        checkUser = self.foo.get("widgets", request.args.get('id'))
        print('checkUser',checkUser[1])
        if checkUser is None:
            return checkUser
        else:
            return checkUser[1]
