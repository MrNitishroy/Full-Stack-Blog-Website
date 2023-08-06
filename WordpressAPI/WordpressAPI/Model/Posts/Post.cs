using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WordpressAPI.Model.Posts
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonRequired]
        public string? Title { get; set; } 
        [BsonRequired]
        public string? Description { get; set; }
        public string? Author { get; set; }
        public string? Image { get;set; }
        public string[] Tags { get; set; } = { "undefined", "Ni30" };
      
    }
}
