export interface EgyptCityLabel {
  name: string;
  governorate: string;
  coordinates: [number, number];
  isCapital?: boolean;
  minZoom?: number;
}

/**
 * Simplified reference boundary polygon for the Arab Republic of Egypt
 * to visually anchor national borders alongside OpenStreetMap administrative layers.
 */
export const EGYPT_BORDER_GEOJSON: GeoJSON.Feature<GeoJSON.Polygon> = {
  type: 'Feature',
  properties: {
    name: 'جمهورية مصر العربية',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [25.15, 31.66],
        [26.2, 31.5],
        [27.24, 31.36],
        [28.45, 31.07],
        [29.88, 31.21],
        [30.98, 31.52],
        [32.3, 31.26],
        [33.8, 31.13],
        [34.23, 31.32],
        [34.89, 29.5],
        [34.68, 28.45],
        [34.26, 27.85],
        [33.85, 27.95],
        [33.25, 28.9],
        [32.55, 29.96],
        [32.45, 29.3],
        [33.2, 28.1],
        [33.9, 27.15],
        [34.4, 26.1],
        [34.9, 25.1],
        [35.5, 23.95],
        [36.85, 22.0],
        [31.35, 22.0],
        [25.0, 22.0],
        [25.0, 25.5],
        [24.72, 27.7],
        [24.95, 29.8],
        [25.15, 31.66],
      ],
    ],
  },
};

export const EGYPT_GOVERNORATES_AND_CITIES: EgyptCityLabel[] = [
  { name: 'القاهرة', governorate: 'محافظة القاهرة', coordinates: [30.0444, 31.2357], isCapital: true, minZoom: 5 },
  { name: 'الإسكندرية', governorate: 'محافظة الإسكندرية', coordinates: [31.2001, 29.9187], minZoom: 5 },
  { name: 'بورسعيد', governorate: 'محافظة بورسعيد', coordinates: [31.2653, 32.3019], minZoom: 6 },
  { name: 'السويس', governorate: 'محافظة السويس', coordinates: [29.9668, 32.5498], minZoom: 6 },
  { name: 'الإسماعيلية', governorate: 'محافظة الإسماعيلية', coordinates: [30.5965, 32.2715], minZoom: 7 },
  { name: 'المنصورة', governorate: 'محافظة الدقهلية', coordinates: [31.0409, 31.3785], minZoom: 7 },
  { name: 'طنطا', governorate: 'محافظة الغربية', coordinates: [30.7865, 31.0004], minZoom: 7 },
  { name: 'أسيوط', governorate: 'محافظة أسيوط', coordinates: [27.1783, 31.1859], minZoom: 5 },
  { name: 'سوهاج', governorate: 'محافظة سوهاج', coordinates: [26.5569, 31.6948], minZoom: 7 },
  { name: 'الأقصر', governorate: 'محافظة الأقصر', coordinates: [25.6872, 32.6396], minZoom: 6 },
  { name: 'أسوان', governorate: 'محافظة أسوان', coordinates: [24.0889, 32.8998], minZoom: 5 },
  { name: 'الغردقة', governorate: 'محافظة البحر الأحمر', coordinates: [27.2579, 33.8116], minZoom: 5 },
  { name: 'رأس غارب', governorate: 'محافظة البحر الأحمر', coordinates: [28.3596, 33.0772], minZoom: 6 },
  { name: 'شرم الشيخ', governorate: 'محافظة جنوب سيناء', coordinates: [27.9158, 34.3299], minZoom: 6 },
  { name: 'العريش', governorate: 'محافظة شمال سيناء', coordinates: [31.1321, 33.8033], minZoom: 6 },
  { name: 'مرسى مطروح', governorate: 'محافظة مطروح', coordinates: [31.3543, 27.2373], minZoom: 5 },
  { name: 'الخارجة', governorate: 'محافظة الوادي الجديد', coordinates: [25.439, 30.5586], minZoom: 5 },
];
