'''
Custom permissions classes for apiView
'''
from rest_framework.permissions import BasePermission

class IsUserLoggedIn(BasePermission):
    '''
    Permission: Is_User_Logged_In
    check: not an anonymous user, only parker authorised users
    '''
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True

        if str(request.user) == 'AnonymousUser':
            return False
        return True
