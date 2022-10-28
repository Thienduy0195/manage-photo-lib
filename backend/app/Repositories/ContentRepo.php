<?php

namespace App\Repositories;

use App\Models\Content;

class ContentRepo extends EloquentRepo
{
    /**
     * @inheritDoc
     */
    public function getModel()
    {
        return Content::class;
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function insert($data)
    {
        return $this->model->insertGetId($data);
    }

    public function findOne($id = 1)
    {
        return $this->model->find($id);
    }

    public function update($id, array $attributes)
    {
        return $this->model->where('id', $id)->update($attributes);
    }

    public function manyUpdate(array $attributes)
    {
        foreach ($attributes as $slider) {
            $keys = ['id' => $slider['id']];
            $this->model->updateOrCreate($keys, $slider);
        }
    }

    public function delete($id)
    {
        return $this->model->where('id', $id)->delete();
    }

    public function manyDelete($items)
    {
        foreach ($items as $id) {
            $this->model->where('id', $id)->delete();
        }
    }
}
