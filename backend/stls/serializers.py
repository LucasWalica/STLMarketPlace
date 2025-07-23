from rest_framework import serializers
from .models import STL, STLOnAlbum

class STLSerializer(serializers.ModelSerializer):


    likes = serializers.IntegerField(read_only=True)
    downloads = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = STL
        fields = [
            "name", "description", 
            "stlUrl", "albumFk", 
            "category1", "category2", "price",
            "likes", "downloads"
        ]

    extra_kwargs = {
            "albumFk": {"required": False, "allow_null": True},
            "category1": {"required": False, "allow_null": True},
            "category2": {"required": False, "allow_null": True},
            "price": {"required": False, "allow_null": True},
        }

    def create(self, validated_data):
        user = self.context['request'].user
        return STL.objects.create(fkUser=user, **validated_data)


class STLOnAlbumSerializer(serializers.ModelSerializer):
    model = STLOnAlbum
    fields = ["fkAlbum", "fkSTL"]