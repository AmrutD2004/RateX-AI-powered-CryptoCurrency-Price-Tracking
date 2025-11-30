from rest_framework import serializers
from .models import * 


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'userName', 'password']
        write_only = ('password',)