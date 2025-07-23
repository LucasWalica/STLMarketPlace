from rest_framework import serializers
from .models import DownloadsByUser


class DownloadSerializer(serializers.ModelSerializer):
    class Meta:

        fkUser = serializers.IntegerField(read_only=True)
        fkSTL = serializers.IntegerField(read_only=True)

        model = DownloadsByUser
        fields = ["fkUser", "fkSTL"]