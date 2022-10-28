<?php

namespace App\Repositories;

use App\Models\Slider;

class SliderRepo extends EloquentRepo
{
    /**
     * @inheritDoc
     */
    public function getModel()
    {
        return Slider::class;
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

    public function manyUpdate(array $items)
    {
        foreach ($items as $slider) {
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
