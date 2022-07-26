<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{
    public function getLoginURL()
    {
        return response([
            "url" => Socialite::with('google')->stateless()->redirect()->getTargetUrl()
        ]);
    }


    public function loginCallback()
    { {
            $user = Socialite::with('google')->stateless()->user();
            $googleUser = User::updateOrCreate(
                ['email' => $user->email],
                ['name' => $user->name, 'google_id' => $user->id, 'avater' => $user->avatar]
            );
            $token = $googleUser->createToken($googleUser->email)->plainTextToken;

            Auth::login($googleUser);

            return response([
                'token' => $token,
                'url' => 'http://localhost:3000',
                'avatar' => $user->avatar,
            ]);
        }
    }



    public function logout()
    {
        if (Auth::check()) {

            $tokens = DB::table('personal_access_tokens')->where('name', Auth::user()->email)->get();
            foreach ($tokens as $token) {
                DB::table('personal_access_tokens')->where('token', $token->token)->delete();
            }
            return response([
                'url' => "http://localhost:3000/"
            ]);
        }
    }
}
