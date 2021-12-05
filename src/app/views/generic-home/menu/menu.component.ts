import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';


interface Node {
    name: string;
    route?: string;
    children?: Node[];
}

const TREE_DATA: Node[] = [
    {
      name: 'Configurações',
      children: [
          {name: 'Conta'},
          {name: 'Tag', route: 'tag'},
          {name: 'Carteira', route: 'wallet'}
        ],
    },
    {
      name: 'Financeiro',
      children: [
        {
          name: 'Entradas',
          route: 'credit-transactions'
        },
        {
          name: 'Saídas',
          route: 'debit-transactions'
        },
      ],
    },
    {
        name: 'Dashboard',
        children: [{name: '...'}]
    }
];

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    route?: string;
    level: number;
 }


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    constructor(private router: Router) {
        this.dataSource.data = TREE_DATA;
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable,
    );

  treeFlattener = new MatTreeFlattener(
    (node: Node, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level
      };
    },
      node => node.level,
        node => node.expandable,
        node => node.children,
  );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    ngOnInit(): void {}

    navigate(name: string): void {
        const node = this.filterByName(name);
        if (node !== undefined && node.route !== undefined) {
            this.router.navigate([node.route]);
        }
    }

    filterByName(name: string): Node {
        return this.findNodes(TREE_DATA).filter(node => node.name === name)[0];
    }

    findNodes(list: Node[]): Array<Node> {
        const listReturn: Node[] = [];
        list.forEach(node => {
            listReturn.push(node);
            if (node.children !== undefined) {
                listReturn.push(...this.findNodes(node.children));
            }
        });
        return listReturn;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
