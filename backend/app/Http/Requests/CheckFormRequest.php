<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckFormRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'cliente' => 'required|string|min:3',
            'vendedor' => 'required|string|min:3',
            'descricao' => 'required|string|min:10',
            'valor' => 'required|numeric|min:3'
        ];
    }

    public function messages()
    {
    return [
        'cliente.required' => 'O campo cliente é obrigatório.',
        'vendedor.required' => 'O campo vendedor é obrigatório.',
        'descricao.required' => 'O campo Descrição é obrigatório.',
        'valor.required' => 'O campo Valor é obrigatório.',

        'cliente.min' => 'O campo cliente deve ter pelo menos 3 caracteres.',
        'vendedor.min' => 'O campo vendedor deve ter pelo menos 3 caracteres.',
        'descricao.min' => 'O campo descrição deve ter pelo menos 10 caracteres.',
        'valor.min' => 'O campo valor deve ter pelo menos 1 caracteres.',
    ];
    }
}
