using WordpressAPI.Model.Posts;

namespace WordpressAPI.Services
{
    public interface IPostService
    {
        Task<Post> CreatePost(Post post);
        Task<IEnumerable<Post>> GetAllPost();
        Task<Post> GetPostById(string title);
        void DeletePost(string id);
        void UpdatePost(string id, UpdatePostRequest post);
    }
}