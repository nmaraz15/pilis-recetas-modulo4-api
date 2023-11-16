import { Request, Response } from "express";
import { Receta } from "../entity/Receta";
import { User } from '../entity/User'

interface RecetaBody {
  nombre: string;
  descripcion: string;
  foto: string;
  ingredientes: string;
  preparacion: string;
  tiempo: string
}

export const getRecetas = async (req: Request, res: Response) => {
  console.log('entrando...');
  try {
    const recetas = await Receta.find({
      relations: {
      user: true,
        
    },

    });;
    console.log('recetas: --->'), recetas;
    return res.json(recetas);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getReceta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receta = await Receta.findOne({
      where: { id: parseInt(id)},
      relations: {
        user: true,
        
      },
         
    });;

    if (!receta) return res.status(404).json({ message: "Receta not found" });

    return res.json(receta);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createReceta = async (req: Request, res: Response) => {
  const { nombre, descripcion, foto, ingredientes, preparacion, tiempo, userId } = req.body;

  const user = await User.findOneBy({
    id: parseInt(userId),
  })
 
  if (!user)
    return res.status(404).json({ message: 'El Usuario ingresado no existe' })


  const receta = new Receta();
  receta.nombre = nombre;
  receta.descripcion = descripcion;
  receta.foto = foto;
  receta.ingredientes = ingredientes;
  receta.preparacion = preparacion;
  receta.tiempo = tiempo;
  receta.user = userId;
  await receta.save();
  return res.json(receta);
};

export const updateReceta = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const receta = await Receta.findOneBy({ id: parseInt(id) });
    if (!receta) return res.status(404).json({ message: "Not receta found" });

    await Receta.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteReceta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Receta.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Receta not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};