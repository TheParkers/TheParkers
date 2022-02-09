from apps.users.models import User
from rest_framework import authentication
from rest_framework import exceptions

class AppAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get('Http-X-Token')
        if not token:
            return None

        try:
            user = User.objects.get(tpk_firebaseid=token)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)