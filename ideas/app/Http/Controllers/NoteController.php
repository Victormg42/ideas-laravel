<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    
    public function index(){
        return view('mostrar');
    }

    public function read(){
        $mostrar = DB::table('notes')->get();
        return response()->json($mostrar, 200);
    }

    public function crear(Request $request){
        try {
            $datos = $request->except('_token', 'enviar');
            DB::table('notes')->insertGetId(['Title'=>$datos['title'],'Description'=>$datos['description']]);
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th){
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        }
    }

    public function borrar(Request $request){
        try {
            $id = $request->input('id');
            DB::table('notes')->where('id', '=', $id)->delete();
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        }
    }

    public function editar(Request $request){
        try {
            $datos = request()->except('_token', 'enviar', '_method');
            $id = $request->input('id');
            DB::table('notes')->where('id', '=', $id)->update($datos);
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        } 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Note $note)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        //
    }
}
