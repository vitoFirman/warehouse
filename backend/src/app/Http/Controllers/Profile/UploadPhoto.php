<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

/**
 * @OA\Post(
 *   path="/api/profile/upload-photo",
 *   summary="Upload Photo For Profile",
 *   tags={"Profile"},
 *   security={{"bearerAuth": {}}},
 *   @OA\RequestBody(
 *       description="Request Body For Profile",
 *       required=true,
 *       @OA\MediaType(
 *         mediaType="multipart/form-data",
 *         @OA\Schema(
 *           @OA\Property(
 *             property="photo",
 *             type="file",
 *           )
 *         )
 *       )
 *   ),
 *   @OA\Response(
 *       response=200,
 *       description="Success Upload",
 *       @OA\JsonContent()
 *   ),
 *   @OA\Response(
 *       response="400",
 *       description="Invalid Username Or Password",
 *       @OA\JsonContent()
 *   ),
 *   @OA\Response(
 *       response="500",
 *       description="Internal Server Error",
 *       @OA\JsonContent()
 *   )
 * )
 */
class UploadPhoto extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        $id = Auth::user()->id;
        $profile = UserProfile::where('userid', $id)->first();
        $file = $request->file('photo');
        $path = public_path('Uploads/Profile/Photo/');
        $ext = $file->getClientOriginalExtension();
        $fileName = md5($id . '-' . now() . '.' . $ext);
        $file->move($path, $fileName);
        if ($profile->image) {
            if (File::exists($profile->image)) File::delete($profile->image);
        }
        $profile->photo = 'Uploads/Profile/Photo/' . $fileName;
        $profile->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success'
        ]);
    }
}
