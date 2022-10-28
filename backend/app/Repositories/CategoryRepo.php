<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepo extends EloquentRepo
{
    /**
     * @inheritDoc
     */
    public function getModel()
    {
        return Category::class;
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
