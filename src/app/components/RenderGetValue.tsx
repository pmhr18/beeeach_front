'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '../utils/api';

interface Brewery {
  id: number;
  name: string;
}
interface Country {
  id: number;
  name: string;
}
interface Prefecture {
  id: number;
  name: string;
}
interface Taste {
  id: number;
  taste: string;
}
interface Container {
  id: number;
  name: string;
}
interface Style {
  id: number;
  name: string;
}
interface Color {
  id: number;
  color: string;
}
interface Abv {
  id: number;
  num: string;
}
interface Type {
  id: number;
  name: string;
}

function RenderGetItemValue() {

	// render value 表示データ格納用
	const [renderBreweriesId, setRenderBreweriesId] = useState<Brewery[]>([]);
	const [renderCountriesId, setRenderCountriesId] = useState<Country[]>([]);
	const [renderPrefecturesId, setRenderPrefecturesId] = useState<Prefecture[]>([]);
	const [renderTastesId, setRenderTastesId] = useState<Taste[]>([]);
	const [renderContainersId, setRenderContainersId] = useState<Container[]>([]);
	const [renderStylesId, setRenderStylesId] = useState<Style[]>([]);
	const [renderColorsId, setRenderColorsId] = useState<Color[]>([]);
	const [renderAbvsId, setRenderAbvsId] = useState<Abv[]>([]);
	const [renderTypesId, setRenderTypesId] = useState<Type[]>([]);
}

export default RenderGetItemValue;