require 'json'

def generate_maze(width, height)
  grid = Array.new(height) { Array.new(width) { { top: true, right: true, bottom: true, left: true, visited: false } } }

  start_x, start_y = 0, 0
  grid[start_y][start_x][:visited] = true

  stack = [[start_x, start_y]]
  visited_order = [[start_x, start_y]]

  directions = [
    [0, -1, :top, :bottom],    
    [1, 0, :right, :left],     
    [0, 1, :bottom, :top],     
    [-1, 0, :left, :right]     
  ]

  while stack.any?
    cx, cy = stack.last
    unvisited_neighbors = []

    directions.each do |dx, dy, wall, opposite_wall|
      nx = cx + dx
      ny = cy + dy

      if nx >= 0 && nx < width && ny >= 0 && ny < height && !grid[ny][nx][:visited]
        unvisited_neighbors << [nx, ny, wall, opposite_wall]
      end
    end

    if unvisited_neighbors.any?
      nx, ny, wall, opposite_wall = unvisited_neighbors.sample

      grid[cy][cx][wall] = false
      grid[ny][nx][opposite_wall] = false

      grid[ny][nx][:visited] = true
      visited_order << [nx, ny]

      stack << [nx, ny]
    else
      stack.pop
    end
  end

  grid.each do |row|
    row.each do |cell|
      cell[:visited] = false
    end
  end

  { grid: grid, visited_order: visited_order }
end

def bfs(maze_grid, start_x, start_y, end_x, end_y)
  width = maze_grid[0].length
  height = maze_grid.length

  queue = [[start_x, start_y]]
  visited = Array.new(height) { Array.new(width, false) }
  parent = {}

  visited[start_y][start_x] = true
  parent[[start_x, start_y]] = nil

  bfs_order = [[start_x, start_y]]

  directions = [
    [0, -1, :top],    
    [1, 0, :right],   
    [0, 1, :bottom],  
    [-1, 0, :left]    
  ]

  found = false
  while queue.any? && !found
    cx, cy = queue.shift

    directions.each do |dx, dy, wall|
      nx = cx + dx
      ny = cy + dy

      if nx >= 0 && nx < width && ny >= 0 && ny < height &&
         !maze_grid[cy][cx][wall] && !visited[ny][nx]
        visited[ny][nx] = true
        parent[[nx, ny]] = [cx, cy]
        bfs_order << [nx, ny]
        queue << [nx, ny]

        if nx == end_x && ny == end_y
          found = true
          break
        end
      end
    end
  end

  path = []
  if found
    current = [end_x, end_y]
    while current
      path.unshift(current)
      current = parent[current]
    end
  end

  { bfs_order: bfs_order, path: path }
end

def maze_to_walls_format(maze_grid)
  width = maze_grid[0].length
  height = maze_grid.length

  walls = []
  height.times do |y|
    width.times do |x|
      cell = maze_grid[y][x]
      walls << [x, y, 0] if cell[:top]     
      walls << [x, y, 1] if cell[:right]   
      walls << [x, y, 2] if cell[:bottom]  
      walls << [x, y, 3] if cell[:left]    
    end
  end

  walls
end


def main
  width = 15
  height = 15
  start_x, start_y = 0, 0
  end_x, end_y = width - 1, height - 1

  maze_result = generate_maze(width, height)
  maze_grid = maze_result[:grid]
  dfs_order = maze_result[:visited_order]

  bfs_result = bfs(maze_grid, start_x, start_y, end_x, end_y)
  bfs_order = bfs_result[:bfs_order]
  path = bfs_result[:path]

  walls = maze_to_walls_format(maze_grid)

  result = {
    width: width,
    height: height,
    start: [start_x, start_y],
    end: [end_x, end_y],
    walls: walls,
    dfs_visited_order: dfs_order,
    bfs_visited_order: bfs_order,
    shortest_path: path
  }

  puts JSON.pretty_generate(result)
end

main if __FILE__ == $PROGRAM_NAME