<?php

namespace App\Repositories;

use App\Models\OrderProduct;

class OrderProductRepo extends EloquentRepo
{
    /**
     * @inheritDoc
     */
    public function getModel()
    {
        return OrderProduct::class;
    }

    /**
     * @param $offset
     * @param $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findAll($limit = 50)
    {
        return $this->model->with('order_products')->paginate($limit);
    }

    public function insert($data)
    {
        return $this->model->insertGetId($data);
    }

    public function findOne($id)
    {
        return $this->model->find($id);
    }

    public function update($id, array $attributes)
    {
        return $this->model->where('id', $id)->update($attributes);
    }

    public function delete($id)
    {
        return $this->model->where('id', $id)->delete();
    }
}
