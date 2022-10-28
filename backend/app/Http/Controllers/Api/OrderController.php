<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\OrderProductRepo;
use App\Repositories\OrderRepo;
use App\Repositories\GalleryRepo;
use Illuminate\Http\Request;
use App\Mail\OrderShipped;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * @var OrderRepo
     */
    private $orderRepo;

    /**
     * @var OrderProductRepo
     */
    private $orderProductRepo;

    /**
     * @var GalleryRepo
     */
    private $galleryRepo;

    public function __construct(
        OrderRepo $orderRepo,
        OrderProductRepo $orderProductRepo,
        GalleryRepo $galleryRepo
    ) {
        $this->orderRepo = $orderRepo;
        $this->orderProductRepo = $orderProductRepo;
        $this->galleryRepo = $galleryRepo;
    }

    public function index()
    {
        return $this->orderRepo->findAll();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $productQuantity = $request->all()['productQuantity'];
        $id = $this->orderRepo->insert($request->except('productQuantity'));
        $galleries = [];
        foreach ($productQuantity as $item) {
            $gallery =  $this->galleryRepo->findOne($item['id']);
            $gallery->quantity = $item['quantity'];
            $galleries[] = $gallery;
            $data = [
                'order_id' => $id,
                'gallery_id' => $item['id'],
                'quantity' => $item['quantity']
            ];
            $this->orderProductRepo->insert($data);
        }
        Mail::to($request->all()['email'])->send(new OrderShipped($request->all(), $galleries));
        return $id;
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function show($id)
    {
        return $this->orderRepo->findOne($id);
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
        return $this->orderRepo->update($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->orderRepo->delete($id);
    }
}
