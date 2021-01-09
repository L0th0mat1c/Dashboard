
from serverW.Models import Model as mod
from flask import request

from werkzeug.security import check_password_hash, generate_password_hash

class User():
    
    def __init__(self):

        self.foo = mod()

    def getUser(self):
        idUser = request.args.get('id')
        name = request.args.get('name')
        if idUser is None:
            res = self.foo.get("users")
            return res
        elif name is not None:
            res = self.foo.get("users", None, name)
            return res
        elif idUser is not None:
            res = self.foo.get("users", idUser)
            return res
    
    def addUser(self):

        name = request.args.get('name')
        if " " in name:
            return 'error'
        email = request.args.get('email')
        password = request.args.get('password')
        user = self.foo.get("users",None, name)

        if not name:
            error = 'name is required.'
        elif not password:
            error = 'Password is required.'
        elif  user is not None:
            error = 'User {} is already registered.'.format(name)

        if user is None:
            
            data = {
                "name": name,
                "email": email,
                "password": password
            }
            self.foo.add("users", data)
    
    def updateUser(self):
        user = self.foo.get("users", request.args.get('id'))
        name = request.args.get('name')
        email = request.args.get('email')
        password = request.args.get('password')
        if not name:
            name = user[1]
        if not email:
            email = user[2]
        if not password:
            password = user[3]
        else:
            
            data = {
                "id": request.args.get("id"),
                "name": name,
                "email": email,
                "password": password
            }
        self.foo.update("users", data)
    
    def deleteUser(self):
        id = request.args.get("id")
        self.foo.delete("users", id)

    def loginUser(self):
        name = request.form['name']
        password = request.form['password']
        if name is None or password is None:
            return "error not exist"
        else:
            log = self.foo.get("users", None, name)
        if log is not None:
            if not check_password_hash(log[3], password):
                return None
            else:
                return log

    def getSession(self, id):
        getLog = self.foo.get("users", id)
        if getLog is None:
            return 'error, not user saved in database'
        else:
            return getLog[0]

    def register(self, name, email, password):
        userNew = self.foo.get("users", None, name)
        if userNew is not None:
            return "user already exists !"   
        else:
            password = generate_password_hash(password)
            data = {
                "name": name,
                "email": email,
                "password": password
            }
            self.foo.add("users", data)
            