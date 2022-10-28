<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ListRequest;
use App\Repositories\HeaderRepo;
use App\Repositories\ContentRepo;
use App\Repositories\FooterRepo;
use App\Repositories\SliderRepo;
use Illuminate\Http\Request;
use App\Services\Common\ResponseService;

class HomeController extends Controller
{
    private $headerRepo;
    private $contentRepo;
    private $footerRepo;
    private $sliderRepo;
    /**
     * @var ResponseService
     */
    private $responseService;

    public function __construct(
        HeaderRepo $headerRepo,
        ContentRepo  $contentRepo,
        FooterRepo $footerRepo,
        SliderRepo $sliderRepo,
        ResponseService $responseService
    ) {
        $this->headerRepo = $headerRepo;
        $this->contentRepo = $contentRepo;
        $this->footerRepo = $footerRepo;
        $this->sliderRepo = $sliderRepo;
        $this->responseService = $responseService;
    }

    public function index()
    {
        $headers = $this->headerRepo->findOne();
        $content = $this->contentRepo->findAll();
        $footer = $this->footerRepo->findAll();
        $result = [
            'headers' => $headers,
            'content' => $content,
            'footer' => $footer
        ];
        return $this->responseService->response(
            true,
            $result,
            'success'
        );
    }


    public function update(Request $request)
    {
        $data = $request->all();
        $headers = $data['headers'];
        $contents = $data['contents'];
        $footers = $data['footers'];
        $slidersDelete = $data['slidersDelete'];
        $contentsDelete = $data['contentsDelete'];
        $footersDelete = $data['footersDelete'];
        if (count($slidersDelete)) {
            $this->sliderRepo->manyDelete($slidersDelete);
        }
        if (count($contentsDelete)) {
            $this->contentRepo->manyDelete($contentsDelete);
        }
        if (count($footersDelete)) {
            $this->footerRepo->manyDelete($footersDelete);
        }
        $sliders = $headers['sliders'];
        $this->sliderRepo->manyUpdate($sliders);
        $headUpdate = [
            'title' => $headers['title'],
            'desc' => $headers['desc']
        ];
        $this->headerRepo->update(1, $headUpdate);
        $this->contentRepo->manyUpdate($contents);
        $this->footerRepo->manyUpdate($footers);

        return $this->responseService->response(
            true,
            [],
            'success'
        );
    }
}
