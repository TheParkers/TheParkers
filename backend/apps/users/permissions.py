from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

def assign_permissions_to_roles():
    '''
        Create user roles
    '''
    Group.objects.get_or_create(name='SUPERUSER')
    Group.objects.get_or_create(name='TENANT')
    Group.objects.get_or_create(name='LANDLORD')
    Group.objects.get_or_create(name='VIEWER')
    
    #Assign Permissions to roles
    # all permissions to superuser
    super_user = Group.objects.get(name='SUPERUSER')
    superuser_permissions = list(Permission.objects.all())
    try:
        super_user.permissions.add(*superuser_permissions)
    except:
        pass

    tenant = Group.objects.get(name='TENANT')
    tenant_permissions = [] #TBD
    tenant.permissions.set(tenant_permissions)

    landlord = Group.objects.get(name='LANDLORD')
    landlord_permissions = [] #TBD
    landlord.permissions.set(landlord_permissions)


    # all view permissions to viewers
    viewer = Group.objects.get(name='VIEWER')
    for content_type in ContentType.objects.all():
        viewer_permissions = list(Permission.objects.filter(name="Can view %s" % content_type.name))
        try:
            viewer.permissions.add(*viewer_permissions)
        except:
            pass
