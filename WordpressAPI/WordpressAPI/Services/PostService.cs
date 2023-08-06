using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WordpressAPI.Model.Posts;

namespace WordpressAPI.Services
{
    public class PostService : IPostService
    {

        private readonly IMongoCollection<Post> _postCollection;
        private readonly IOptions<DatabaseSettings> _dbSettings;

        public PostService(IOptions<DatabaseSettings> dbSettings)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _postCollection = mongoDatabase.GetCollection<Post>(dbSettings.Value.PostsCollection);
        }

        public async Task<IEnumerable<Post>> GetAllPost()
        {
            return await _postCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Post> GetPostById(string id)
        {
            var posts = await _postCollection.Find(post =>post.Id==id).FirstOrDefaultAsync();
            return posts;
        }

        public async Task<Post> CreatePost(Post post)
        {
            await _postCollection.InsertOneAsync(post);
            return post;
        }

        public async void DeletePost(string id)
        {
            var filter = Builders<Post>.Filter.Eq(post => post.Id, id);
            await _postCollection.DeleteOneAsync(filter);
        }

        public async void UpdatePost(string id, UpdatePostRequest post)
        {
            var filter = Builders<Post>.Filter.Eq(post => post.Id , id);
            var update = Builders<Post>.Update
                .Set(p=>p.Title, post.Title)
                .Set(p=>p.Description,post.Description)
                .Set(p=>p.Image,post.Image)
                .Set(p=>p.Tags,post.Tags);
            await _postCollection.UpdateOneAsync(filter, update);
        }



    }
}
