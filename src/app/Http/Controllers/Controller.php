<?php

namespace App\Http\Controllers;


/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0",
 *     description="Api Documentation"
 * )
 * * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="JWT Authorization header using the Bearer scheme."
 * )
 */
abstract class Controller
{
    //
}
