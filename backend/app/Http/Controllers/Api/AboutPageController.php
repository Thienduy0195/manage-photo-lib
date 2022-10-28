<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\AboutMeRepo;
use App\Services\UserService;
use Illuminate\Http\Request;

class AboutPageController extends Controller
{
    /**
     * @var AboutMeRepo
     */
    private $aboutPageRepo;

    public function __construct(AboutMeRepo $aboutPageRepo)
    {
        $this->aboutPageRepo = $aboutPageRepo;
    }

    public function index()
    {
        return $this->aboutPageRepo->findOne();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->aboutPageRepo->insert($request->all());
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function show($id)
    {
        return $this->aboutPageRepo->findOne($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id = 1)
    {
        return $this->aboutPageRepo->update($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->aboutPageRepo->delete($id);
    }
}
