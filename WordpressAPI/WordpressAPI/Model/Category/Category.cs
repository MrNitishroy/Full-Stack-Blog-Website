using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace WordpressAPI.Model.Category
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }

    }
}
