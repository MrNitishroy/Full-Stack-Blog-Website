using MongoDB.Bson.Serialization.Attributes;

namespace WordpressAPI.Model.Posts
{
    public class UpdatePostRequest
    { 
        public string Title { get; set; } = null;
    
        public string Description { get; set; } = null;
       
        public string Image { get; set; }
        public string[] Tags { get; set; }
    }
}
