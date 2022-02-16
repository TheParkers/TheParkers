from rest_framework.permissions import BasePermission

class IsUserLoggedIn(BasePermission):
    def has_permission(self, request, view):
        if str(request.user) == 'AnonymousUser':
            return False
        return True
