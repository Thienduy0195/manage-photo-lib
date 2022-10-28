<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ListRequest;
use App\Repositories\PostRepo;
use App\Services\UserService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * @var UserService
     */
    private $userService;
    /**
     * @var PostRepo
     */
    private $postRepo;

    public function __construct(UserService $userService, PostRepo $postRepo)
    {
        $this->userService = $userService;
        $this->postRepo = $postRepo;
    }


    public function index()
    {
        return $this->postRepo->findAll();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->postRepo->insert($request->all());
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function show($id)
    {
        return $this->postRepo->findOne($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return $this->postRepo->update($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->postRepo->delete($id);
    }
}
