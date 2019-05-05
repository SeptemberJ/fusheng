<template>
  <div>
    <button @click="Down">Excel下载</button>
  </div>
</template>

<script>
import XLSX from 'xlsx-style'
import FileSaver from 'file-saver'
import 'blob.js'

export default {
  name: 'Excel',
  data () {
    return {
      excelData: {}
    }
  },
  created () {
    function getCharCol (n) {
      // let temCol = ''
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    }
    var json = [
      {
        '序号': '001',
        '图号': 'T001',
        '名称': '水管',
        '数量': '1',
        '工序': '第一道',
        '人员': '张三',
        '定额费用': '200',
        '开始日期': '2019-03-28',
        '结束日期': '2019-03-30',
        '03-26': 'outer',
        '03-27': 'outer',
        '03-28': 'inner',
        '03-29': 'inner',
        '03-30': 'inner'
      },
      {
        '序号': '002',
        '图号': 'T001',
        '名称': '铆钉',
        '数量': '1',
        '工序': '第二道',
        '人员': '李四',
        '定额费用': '200',
        '开始日期': '2019-03-26',
        '结束日期': '2019-03-30',
        '03-26': 'inner',
        '03-27': 'inner',
        '03-28': 'inner',
        '03-29': 'inner',
        '03-30': 'inner'
      }
    ]

    var hasBg = {
      fill: {
        fgColor: {rgb: '409EFF'}
      }
    }
    var tmpdata = json[0]
    json.unshift({})
    var keyMap = []
    for (var k in tmpdata) {
      keyMap.push(k)
      json[0][k] = k
    }
    tmpdata = {}
    tmpdata['!ref'] = 'A1:N11'
    // tmpdata['!cols'] = [{wpx: 200}]
    tmpdata['!merges'] = [
      {
        s: {c: 0, r: 0},
        e: {c: 1, r: 0}
      },
      {
        s: {c: 2, r: 0},
        e: {c: 3, r: 0}
      },
      {
        s: {c: 4, r: 0},
        e: {c: 5, r: 0}
      },
      {
        s: {c: 6, r: 0},
        e: {c: 13, r: 0}
      },
      // 第二行
      {
        s: {c: 0, r: 1},
        e: {c: 1, r: 1}
      },
      {
        s: {c: 2, r: 1},
        e: {c: 3, r: 1}
      },
      {
        s: {c: 4, r: 1},
        e: {c: 5, r: 1}
      },
      {
        s: {c: 6, r: 1},
        e: {c: 13, r: 1}
      },
      // 第三行
      {
        s: {c: 0, r: 2},
        e: {c: 1, r: 2}
      },
      {
        s: {c: 2, r: 2},
        e: {c: 3, r: 2}
      },
      {
        s: {c: 4, r: 2},
        e: {c: 13, r: 4}
      },
      // 第四行
      {
        s: {c: 0, r: 3},
        e: {c: 1, r: 3}
      },
      {
        s: {c: 2, r: 3},
        e: {c: 3, r: 3}
      },
      // 第五行
      {
        s: {c: 0, r: 4},
        e: {c: 3, r: 4}
      },
      {
        s: {c: 4, r: 4},
        e: {c: 13, r: 4}
      }
    ]
    tmpdata['A1'] = {
      v: 'OR/ZD-040',
      t: 's'
    }
    tmpdata['C1'] = {
      v: '生成进度表',
      t: 's'
    }
    tmpdata['E1'] = {
      v: '项目编号',
      t: 's'
    }
    tmpdata['G1'] = {
      v: 'PT190324-0325',
      t: 's',
      s: {
        alignment: {
          horizontal: 'center'
        }
      }
    }
    // 第二行
    tmpdata['A2'] = {
      v: '制单人',
      t: 's'
    }
    tmpdata['C2'] = {
      v: '王燕婷',
      t: 's'
    }
    tmpdata['E2'] = {
      v: '项目名称',
      t: 's'
    }
    // 第三行
    tmpdata['A3'] = {
      v: '开工日期',
      t: 's'
    }
    tmpdata['C3'] = {
      v: '3月1日',
      t: 's'
    }
    tmpdata['E3'] = {
      v: '注: 需要填写制单人,开工日期,完工日期',
      t: 's'
    }
    // 第四行
    tmpdata['A4'] = {
      v: '完工日期',
      t: 's'
    }
    tmpdata['C4'] = {
      v: '3月21日',
      t: 's'
    }
    // 第五行
    tmpdata['A5'] = {
      v: 'BOM_报价',
      t: 's',
      s: {
        alignment: {
          horizontal: 'center'
        }
      }
    }

    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 6)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
      v: v.v === 'inner' || v.v === 'outer' ? '' : v.v,
      s: v.v === 'inner' ? hasBg : {}
    })
    console.log(tmpdata)
    this.excelData = tmpdata
  },
  methods: {
    Down () {
      const s2ab = s => {
        let buf = new ArrayBuffer(s.length)
        let view = new Uint8Array(buf)
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
      }

      const workbook = {
        SheetNames: ['Sheet1'],
        Sheets: {
          Sheet1: this.excelData
        }
      }

      const workbookOut = XLSX.write(workbook, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      })

      FileSaver.saveAs(new Blob([s2ab(workbookOut)], {
        type: 'application/octet-stream'
      }), 'export.xlsx')
    }
  }
}
</script>
<style>
</style>
