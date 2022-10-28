<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct($orderInfo, $listProduct)
    {
        $this->orderInfo = $orderInfo;
        $this->listProduct = $listProduct;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('receipt')
            ->subject("Order information")
            ->with([
                'orderInfo' => $this->orderInfo,
                'listProduct' => $this->listProduct,
            ]);;
    }
}
