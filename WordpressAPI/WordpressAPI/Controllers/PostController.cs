using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WordpressAPI.Model.Posts;
using WordpressAPI.Services;

namespace WordpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private readonly IPostService postService;

        public PostController(IPostService postService)
        {
            this.postService = postService;
        }

        [HttpGet("GetAllPosts")]
        public async Task<ActionResult> GetAllPosts()
        {
            var posts = await postService.GetAllPost();

            if(posts==null)
            {
                return NotFound();
            }
            else
            { 
            return Ok(posts);
            }
        }
        [HttpGet("Id")]
        public async Task<ActionResult> GetAllPostById([FromQuery] string title)
        {
            var posts = await postService.GetPostById(title);
            
            if(posts==null)
            {
                return NotFound();
            }
            else
            {
                return Ok(posts);
            }
        }

        [HttpPost("CreatePost")]
        public async Task<ActionResult> CreatePost(Post post)
        {
            var _post = await postService.CreatePost(post);
            return Ok(_post);
        }
        [HttpDelete("DeletePost")]

        public async Task<ActionResult> DeletePost([FromQuery]string id)
        {
             postService.DeletePost(id);

            return Ok("Post deleted ");

        }
        [HttpPatch("UpdatePost")]
        public async Task<ActionResult> UpdatePost([FromQuery] string id , [FromBody] UpdatePostRequest post)
        {
            postService.UpdatePost(id, post);
            return Ok(post);
        }
    }
}
