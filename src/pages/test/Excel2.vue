<template>
  <div>
    Excel
    <button @click="Down">下载</button>
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
      con1: true,
      con2: true
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
        '名称': 'name',
        '数量': '1',
        '工序': '第一道',
        '人员': 'test',
        '定额费用': '200',
        '开始日期': '2019-03-30',
        '结束日期': '2019-03-30',
        rq: 'riqi'
      },
      {
        '序号': '002',
        '图号': 'T001',
        '名称': 'name',
        '数量': '1',
        '工序': '第一道',
        '人员': 'test',
        '定额费用': '200',
        '开始日期': '2019-03-30',
        '结束日期': '2019-03-30',
        rq: 'riqi'
      }
    ]
    var tmpdata = json[0]
    json.unshift({})
    var keyMap = []
    for (var k in tmpdata) {
      keyMap.push(k)
      json[0][k] = k
    }
    tmpdata = []

    json.map((v, i) => {
      return keyMap.map((k, j) => {
        return Object.assign({}, {
          v: v[k],
          position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        })
      })
    }).reduce((prev, next) => {
      // console.log('prev', prev)
      // console.log('next', next)
      return prev.concat(next)
    }).forEach((v, i) => {
      tmpdata[v.position] = {v: v.v}
    })

    // json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    //   v: v[k],
    //   position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    // }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
    //   v: v.v
    // })

    console.log('tmpdata', tmpdata)
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
          Sheet1: {
            '!ref': 'A1:N11',
            '!merges': [ // 工作表单元格合并配置项 可选
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
              // {
              //   s: {c: 4, r: 3},
              //   e: {c: 13, r: 3}
              // },
              // 第五行
              {
                s: {c: 0, r: 4},
                e: {c: 3, r: 4}
              },
              {
                s: {c: 4, r: 4},
                e: {c: 13, r: 4}
              }
              // {
              //   s: { // s start 开始
              //     c: 6, // cols 开始列
              //     r: 0 // rows 开始行
              //   },
              //   e: { // e end  结束
              //     c: 9, // cols 结束列
              //     r: 0 // rows 结束行
              //   }
              // }
            ],
            A1: {
              v: 'OR/ZD-040',
              t: 's',
              s: {
                alignment: {
                  horizontal: 'center'
                }
              }
            },
            C1: {
              v: '生成进度表',
              t: 's'
            },
            E1: {
              v: '项目编号:',
              t: 's'
            },
            G1: {
              v: 'PT190324-0325:',
              t: 's',
              s: {
                alignment: {
                  horizontal: 'center'
                }
              }
            },
            // 第二行
            A2: {v: '制单人', t: 's'},
            C2: {v: '王燕婷', t: 's'},
            E2: {v: '项目名称', t: 's'},
            // 第三行
            A3: {v: '开工日期', t: 's'},
            C3: {v: '3月1日', t: 's'},
            E3: {v: '注: 需要填写制单人,开工日期,完工日期', t: 's'},
            // 第四行
            A4: {v: '完工日期', t: 's'},
            C4: {v: '3月21日', t: 's'},
            // 第五行
            A5: {
              v: 'BOM_报价',
              t: 's',
              s: {
                alignment: {
                  horizontal: 'center'
                }
              }
            },
            // 第六行 无合并开始
            A6: {v: '序号', t: 's'},
            B6: {v: '图号', t: 's'},
            C6: {v: '名称', t: 's'},
            D6: {v: '数量', t: 's'},
            E6: {v: '工序', t: 's'},
            F6: {v: '人员', t: 's'},
            G6: {v: '定额费用', t: 's'},
            H6: {v: '开始日期', t: 's'},
            I6: {v: '结束日期', t: 's'},
            // 数据行
            A7: {v: '1', t: 's'},
            B7: {v: '001', t: 's'},
            C7: {v: '热水器', t: 's'},
            D7: {v: '1', t: 's'},
            E7: {v: '油漆', t: 's'},
            F7: {v: '张三', t: 's'},
            G7: {v: '200', t: 's'},
            H7: {v: '2019-03-29', t: 's'},
            I7: {v: '2019-03-30', t: 's'},
            J7: {
              v: '',
              s: {
                fill: {
                  fgColor: {rgb: '409EFF'}
                }
              }
            },
            K7: {
              v: '',
              s: {
                fill: {
                  fgColor: {rgb: '409EFF'}
                }
              }
            },
            L7: {
              v: '',
              s: {
                fill: {
                  fgColor: {rgb: '409EFF'}
                }
              }
            },
            M7: {
              v: '',
              s: {
                fill: {
                  fgColor: {rgb: '409EFF'}
                }
              }
            },
            N7: {
              v: '',
              s: {
                fill: {
                  fgColor: {rgb: '409EFF'}
                }
              }
            }
          }
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
