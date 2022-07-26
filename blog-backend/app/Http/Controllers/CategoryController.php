<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function categories()
    {
        return response([
            "categories" => Category::all()
        ]);
    }

    public function postsByCategory($category)
    {
        $posts = Category::where("name", $category)->first()->post;

        $postsArray = [];


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

        ]);
    }
}
