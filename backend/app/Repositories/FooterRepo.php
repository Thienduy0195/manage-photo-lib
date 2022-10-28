<?php

namespace App\Repositories;

use App\Models\Footer;

class FooterRepo extends EloquentRepo
{
    /**
     * @inheritDoc
     */
    public function getModel()
    {
        return Footer::class;
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

    public function manyUpdate(array $items)
    {
        foreach ($items as $item) {
            $keys = ['id' => $item['id']];
            $this->model->updateOrCreate($keys, $item);
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
