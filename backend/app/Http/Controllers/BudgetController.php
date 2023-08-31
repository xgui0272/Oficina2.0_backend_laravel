<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Budget;

use App\Http\Requests\CheckFormRequest;

class BudgetController extends Controller
{   

    /**
     * Controller para listar todos os orçamentos na tela inicial
     */
    public function show() {

        $budget = Budget::orderBy('created_at', 'desc')->get();
        $budget->transform(function ($item) {
            $item->valorFormatado = number_format($item->valor, 2, ',', '.');
            return $item;
        });
        $budgetJson = $budget->toJson();
        return $budgetJson;
    }



    /**
     * Controller para pode cadastrar novos orçamentos
     */
    public function insert(CheckFormRequest $request) {

        //pega todos os dados da request em json
        $dadosJson = $request->json()->all();

        $budget = new Budget;
        
        $budget->cliente = $dadosJson['cliente'];
        $budget->vendedor = $dadosJson['vendedor'];
        $budget->descricao = $dadosJson['descricao'];
        $budget->valor = $dadosJson['valor'];

        $budget->save();

        return redirect('/')->with('msg', 'Evento Criado com sucesso!');

    }


    /**
     * Controller para buscar orçamentos por nome
     * de cliente ou vendedor
     */
    public function search(Request $request) {

        $search = $request->query('search');

        $results = Budget::where('cliente', 'like', "%$search%")
        ->orWhere('vendedor', 'like', "%$search%")
        ->orderBy('created_at', 'desc')
        ->get();

        $results->transform(function ($item) {
            $item->valorFormatado = number_format($item->valor, 2, ',', '.');
            return $item;
        });

    return response()->json($results);

    }

    /**
     * Controller para buscar orçamentos por um
     * range de datas
     */
    public function searchDate(Request $request) {

        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');

        $results = Budget::whereBetween('created_at', [$startDate, $endDate])
                     ->orderBy('created_at', 'desc')
                     ->get();

        $results->transform(function ($item) {
            $item->valorFormatado = number_format($item->valor, 2, ',', '.');
            return $item;
        });           
        // Retorne os resultados em formato JSON
        return response()->json($results);

    }

    /**
     * Controller para buscar os dados de um
     * orçamento para a tela de update
     */
    public function showUpdate($id) {

        $budget = Budget::find($id);

        
        if (!$budget) {
            return response()->json(['mesg' => 'Dado não encontrado'], 404);
        }

        return response()->json($budget);
    }

    /**
     * Controller para fazer o Update de um
     * orçamento atraves do id
     */
    public function update(CheckFormRequest $request, $id) {
        $budget = Budget::where('id', $id);
        $budget->update($request->all());

    
    }

    /**
     * Controller para fazer o delete
     * de um orçamento
     */
    public function destroy($id) {
        $budget = Budget::find($id);
        $budget->delete();
        
    }


}
