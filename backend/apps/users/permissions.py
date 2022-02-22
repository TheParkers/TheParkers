from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

def assignPermissionsToRoles():
    '''
        Create user roles
    '''
    superuser_role, created = Group.objects.get_or_create(name='SUPERUSER')
    tenant_role, created = Group.objects.get_or_create(name='TENANT')
    landlord_role, created = Group.objects.get_or_create(name='LANDLORD')
    viewer_role, created = Group.objects.get_or_create(name='VIEWER')
    
    '''
        Assign Permissions to roles
    '''
    # all permissions to superuser
    SUPERUSER = Group.objects.get(name='SUPERUSER')
    superuser_permissions = list(Permission.objects.all())
    try:
        SUPERUSER.permissions.add(*superuser_permissions)
    except:
        pass

    TENANT = Group.objects.get(name='TENANT')
    tenant_permissions = [] #TBD
    TENANT.permissions.set(tenant_permissions)

    LANDLORD = Group.objects.get(name='LANDLORD')
    landlord_permissions = [] #TBD
    LANDLORD.permissions.set(landlord_permissions)


    # all view permissions to viewers
    VIEWER = Group.objects.get(name='VIEWER')
    for content_type in ContentType.objects.all():
        viewer_permissions = list(Permission.objects.filter(name = "Can view %s" % content_type.name))
        try:
            VIEWER.permissions.add(*viewer_permissions)
        except:
            pass
