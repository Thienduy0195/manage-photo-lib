<?php

namespace App\Repositories;

use App\Models\Gallery;

class GalleryRepo extends EloquentRepo
{
    /**
     * @inheritDoc
     */
    public function getModel()
    {
        return Gallery::class;
    }

    public function findAll($categoryId,  $id = null)
    {
        $limit = 12;
        if ($categoryId !== 'all') {
            return $this->model
                ->where(['category_id' => $categoryId])
                ->with('category')
                ->orderBy('id', 'desc')
                ->paginate($limit);
        }

        if (auth()->guard('api')->user()) {
            return $this->model
                ->with('category')
                ->orderBy('id', 'desc')
                ->paginate(50);
        }

        return $this->model
            ->with('category')
            ->orderBy('id', 'desc')
            ->paginate($limit);
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
