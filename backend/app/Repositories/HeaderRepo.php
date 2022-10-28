<?php

namespace App\Repositories;

use App\Models\Header;

class HeaderRepo extends EloquentRepo
{
    /**
     * @inheritDoc
     */
    public function getModel()
    {
        return Header::class;
    }

    public function findAll($limit = 12)
    {
        return $this->model->paginate($limit);
    }

    public function insert($data)
    {
        return $this->model->insertGetId($data);
    }

    public function findOne($id = 1)
    {
        return $this->model->with('sliders')->find($id);
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
