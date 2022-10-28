<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ListRequest;
use App\Repositories\GalleryRepo;
use App\Services\UserService;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    /**
     * @var UserService
     */
    private $userService;
    /**
     * @var GalleryRepo
     */
    private $galleryRepo;

    public function __construct(UserService $userService, GalleryRepo $galleryRepo)
    {
        $this->userService = $userService;
        $this->galleryRepo = $galleryRepo;
    }

    public function index(Request $request)
    {
        $category = $request->all()['category_id'] ?? 'all';
        return $this->galleryRepo->findAll($category);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->galleryRepo->insert($request->all());
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function show($id)
    {
        return $this->galleryRepo->findOne($id);
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
        return $this->galleryRepo->update($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->galleryRepo->delete($id);
    }
}
