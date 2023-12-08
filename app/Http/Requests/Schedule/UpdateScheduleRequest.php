<?php

namespace App\Http\Requests\Schedule;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'schedule_name' => 'string|max:255',
            'schedule_description' => 'string|max:255',
            'schedule_day' => 'string|max:255',
            'start_time' => 'date_format:H:i',
            'end_time' => 'date_format:H:i',
            'schedule_color' => 'string|max:255'
        ];
    }
}
