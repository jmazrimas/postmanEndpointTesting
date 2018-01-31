curl -o 047256d0-cb51-4811-ab0f-bd48dafc323d.pdf -XPOST -d'{
	"url": "https://app.amper.xyz/#/reports/047256d0-cb51-4811-ab0f-bd48dafc323d/auth/a78d1e7176f34e318f9f68770c03973e",
	"waitFor": "div.report-heading",
	"pdf": {
		"format": "Letter"
	}
}' -H"content-type: application/json" http://localhost:9000/api/render && echo "done" &
curl -o 874e1a1a-af2d-406b-b2ea-24addcc1cfc8.pdf -XPOST -d'{
	"url": "https://app.amper.xyz/#/reports/874e1a1a-af2d-406b-b2ea-24addcc1cfc8/auth/a78d1e7176f34e318f9f68770c03973e",
	"waitFor": "div.report-heading",
	"pdf": {
		"format": "Letter"
	}
}' -H"content-type: application/json" http://localhost:9000/api/render && echo "done" &
curl -o 4cf5ab24-0349-4362-b8bf-2fc51f68d0ca.pdf -XPOST -d'{
	"url": "https://app.amper.xyz/#/reports/4cf5ab24-0349-4362-b8bf-2fc51f68d0ca/auth/a78d1e7176f34e318f9f68770c03973e",
	"waitFor": "div.report-heading",
	"pdf": {
		"format": "Letter"
	}
}' -H"content-type: application/json" http://localhost:9000/api/render