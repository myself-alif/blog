<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Whoops\Run;

class PostController extends Controller
{
    public function insertPost(Request $request)
    {

        $validation = Validator::make($request->all(), [
            "title" => "required|min:2|max:90",
            "postBody" => "required|min:20|max:3000",
            "category" => "required|min:2",
            "image" => "required |mimes:jpeg,jpg,png | max:99000",
        ]);


        if ($validation->fails()) {
            return response([
                "errors" => $validation->messages()
            ]);
        }


        $image = $request->file("image");
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move("post_images/", $imageName);
        $postsArray = [];

        $user = Auth::user();

        $category = Category::where("name", $request->category)->first();
        if ($category) {

            $post = new Post();
            $post->title = $request->title;
            $post->image = $imageName;
            $post->description = $request->postBody;
            $user->post()->save($post);
            $post->category_id = $category->id;
            $category->post()->save($post);


            $posts = Post::all();

            foreach ($posts as $post) {
                array_push($postsArray, (object)[
                    "id" => $post->id,
                    "title" => $post->title,
                    "postBody" => substr($post->description, 0, 150),
                    "image" => $post->image,
                    "category" => $post->category->name,
                    "created_at" => $post->created_at->diffForHumans()
                ]);
            }
            return response([
                "posts" => array_reverse($postsArray)
            ]);
        } else {
            $newCategory = Category::create([
                'name' => $request->category
            ]);



            $post = new Post();
            $post->title = $request->title;
            $post->image = $imageName;
            $post->description = $request->postBody;
            $user->post()->save($post);
            $post->category_id = $newCategory->id;
            $newCategory->post()->save($post);



            $posts = Post::all();

            foreach ($posts as $post) {
                array_push($postsArray, (object)[
                    "id" => $post->id,
                    "title" => $post->title,
                    "postBody" => substr($post->description, 0, 150),
                    "image" => $post->image,
                    "category" => $post->category->name,
                    "created_at" => $post->created_at->diffForHumans()
                ]);
            }
            return response([
                "posts" => array_reverse($postsArray)
            ]);
        }
    }


    public function posts()
    {
        $postsArray = [];
        $posts = Post::all();

        foreach ($posts as $post) {
            array_push($postsArray, (object)[
                "id" => $post->id,
                "title" => $post->title,
                "postBody" => substr($post->description, 0, 150),
                "image" => $post->image,
                "category" => $post->category->name,
                "created_at" => $post->created_at->diffForHumans()
            ]);
        }
        return response([
            "posts" => array_reverse($postsArray)
        ]);
    }


    public function singlePost($title)
    {
        $post = Post::where("title", $title)->first();

        return response([
            "post" => [
                "title" => $post->title,
                "body" => $post->description,
                "author" => $post->user->name,
                "category" => $post->category->name,
                "time" => $post->created_at->diffForHumans(),
                "image" => $post->image
            ]
        ]);
    }

    public function deletePost($title)
    {
        $post = Post::where("title", $title)->first();
        Storage::disk('public')->delete("post_images/" . $post->image);
        $post->delete();
        $postsArray = [];
        $posts = Post::all();

        foreach ($posts as $post) {
            array_push($postsArray, (object)[
                "id" => $post->id,
                "title" => $post->title,
                "postBody" => substr($post->description, 0, 150),
                "image" => $post->image,
                "category" => $post->category->name,
                "created_at" => $post->created_at->diffForHumans()
            ]);
        }
        return response([
            "posts" => array_reverse($postsArray),
            "url" => "/"
        ]);
    }

    public function postsByTitle($title)
    {
        return response([
            "posts" => DB::table("posts")->where("title", "LIKE", "%" . $title . "%")->get(),
            "url" => "/search/" . $title
        ]);
    }
}
